import './page-garage.styles.css';
import BaseComponent from '../base-component';
import RaceTrack from './race-track/race-track';
import { PageStatus } from './page-garage.types';
import { CarsData, CarType, Settings } from './race-track/race-track.types';
import { DataParams, EngineResp, PageType } from '../../controller/loader.types';
import Loader from '../../controller/loader';
import eventEmitter from '../../utils/event-emitter';
import { turnEngineOnOff } from '../../utils/engine';
import createRandomCarName from '../../utils/cars-randomizer';
import createRandomColor from '../../utils/color-randomizer';
import Pagination from '../pagination/pagination';

export default class GaragePage extends BaseComponent<'section'> {
  private createInputText: BaseComponent<'input'> | null = null;

  private createInputColor: BaseComponent<'input'> | null = null;

  private createBtn: BaseComponent<'button'> | null = null;

  private updateInputText!: BaseComponent<'input'>;

  private updateInputColor!: BaseComponent<'input'>;

  private updateBtn!: BaseComponent<'button'>;

  private raceBtn: BaseComponent<'button'> | null = null;

  private resetBtn: BaseComponent<'button'> | null = null;

  private generateBtn: BaseComponent<'button'> | null = null;

  private totalCarsElement: BaseComponent<'span'> | null = null;

  private raceFieldWrapper: BaseComponent<'div'> | null = null;

  private raceField: BaseComponent<'div'> | null = null;

  private currentPageElement: BaseComponent<'span'> | null = null;

  private pagination!: Pagination;

  private carData: CarType = {
    name: '',
    color: '',
  };

  private id!: number;

  private currentPageStatus: PageStatus = {
    page: 1,
    limit: 7,
  };

  private totalPages: number = 1;

  private totalCars: number = 0;

  private tracksOnPage: RaceTrack[] = [];

  private allTracks: RaceTrack[] = [];

  private finishCounter: number = 0;

  private winnerCounter: number = 0;

  private isNewCar: boolean = false;

  private isSlideBack: boolean = false;

  private isUpdatePage: boolean = false;

  private startIdx: number = 0;

  private endIdx: number = 0;

  constructor() {
    super('section', undefined, 'section garage');
    this.render();
    this.subscribeToEvents();
    this.createAllCarsBackup();
  }

  private render = async (): Promise<void> => {
    await GaragePage.getCars(this.currentPageStatus).then((cars: PageType<CarType>) => {
      this.totalCars = cars.total;
      this.renderSettingsBlock();
      this.raceFieldWrapper = new BaseComponent('div', this.element, 'garage__race-wrapper');
      this.renderRaceBlock(cars.data);
    });
  };

  // creating block with cars settings
  // eslint-disable-next-line max-lines-per-function
  private renderSettingsBlock(): void {
    const settingsWrapper: BaseComponent<'div'> = new BaseComponent('div', this.element, 'garage__settings settings');
    const leftBlock: BaseComponent<'div'> = new BaseComponent('div', settingsWrapper.element, 'settings__left');
    const leftBlockTop: BaseComponent<'div'> = new BaseComponent('div', leftBlock.element, 'settings__left_top');
    const leftBlockBottom: BaseComponent<'div'> = new BaseComponent('div', leftBlock.element, 'settings__left_bottom');
    const centerBlock: BaseComponent<'div'> = new BaseComponent('div', settingsWrapper.element, 'settings__center');
    const rightBlock: BaseComponent<'div'> = new BaseComponent('div', settingsWrapper.element, 'settings__right');
    const createSettingWrapper: BaseComponent<'div'> = new BaseComponent(
      'div',
      centerBlock.element,
      'settings__create-wrapper',
    );
    const updateSettingWrapper: BaseComponent<'div'> = new BaseComponent(
      'div',
      centerBlock.element,
      'settings__update-wrapper',
    );

    this.totalCarsElement = new BaseComponent('span', leftBlockTop.element, 'settings__cars-limit');
    this.generateBtn = GaragePage.createSettingsBtn({
      parent: leftBlockBottom,
      name: 'generate',
      type: 'submit',
    });
    this.pagination = new Pagination(leftBlockBottom, 'settings', this.currentPageStatus, this.totalPages);
    this.createInputText = GaragePage.createSettingsInput({
      parent: createSettingWrapper,
      name: 'create',
      type: 'text',
    });
    this.createInputColor = GaragePage.createSettingsInput({
      parent: createSettingWrapper,
      name: 'create',
      type: 'color',
    });
    this.createBtn = GaragePage.createSettingsBtn({ parent: createSettingWrapper, name: 'create', type: 'submit' });
    this.updateInputText = GaragePage.createSettingsInput({
      parent: updateSettingWrapper,
      name: 'create',
      type: 'text',
    });
    this.updateInputColor = GaragePage.createSettingsInput({
      parent: updateSettingWrapper,
      name: 'update',
      type: 'color',
    });
    this.updateBtn = GaragePage.createSettingsBtn({ parent: updateSettingWrapper, name: 'update', type: 'submit' });
    this.raceBtn = GaragePage.createSettingsBtn({ parent: rightBlock, name: 'race', type: 'submit' });
    this.resetBtn = GaragePage.createSettingsBtn({ parent: rightBlock, name: 'reset', type: 'reset' });

    this.generateBtn.element.textContent = 'ADD 100';
    this.createInputColor.element.value = '#6395BD';
    this.updateInputColor.element.value = '#6395BD';
    this.createInputText.element.placeholder = 'Enter name here';
    this.createInputText.element.setAttribute('required', '');

    this.addListenersFirstLoad();
    this.disableElementsFirstLoad();
    this.totalPages = this.pagination.calculateTotalPages(this.totalCars);
    this.pagination.updateTotalPages(this.totalPages);
  }

  private addListenersFirstLoad(): void {
    this.createInputText?.element.addEventListener('input', this.createTextInputCallback);
    this.createInputColor?.element.addEventListener('input', this.createColorInputCallback);
    this.createBtn?.element.addEventListener('click', this.createBtnCallback);
    this.raceBtn?.element.addEventListener('click', this.raceBtnCallback);
    this.resetBtn?.element.addEventListener('click', this.resetBtnCallback);
    this.generateBtn?.element.addEventListener('click', this.generateBtnCallback);
    this.pagination.rightArrowBtn?.element.addEventListener('click', this.rightArrowBtnCallback);
    this.pagination.leftArrowBtn?.element.addEventListener('click', this.leftArrowBtnCallback);
  }

  private disableElementsFirstLoad(): void {
    this.disableResetBtn();
    this.disableUpdateElements();
  }

  private updateGarageNumber(num: number): void {
    if (this.totalCarsElement?.element) {
      this.totalCarsElement.element.textContent = `Garage: ${num}`;
    }
  }

  // callbacks for creating a new car
  private createTextInputCallback = (): void => {
    if (this.createInputText) {
      this.carData.name = this.createInputText.element.value;
    }
  };

  private createColorInputCallback = (): void => {
    if (this.createInputColor) {
      this.carData.color = this.createInputColor.element.value;
    }
  };

  private createBtnCallback = async (): Promise<void> => {
    const newCar: CarType = await GaragePage.createCar(this.carData);
    this.isNewCar = true;
    this.createRaceTrack(newCar);
    this.totalCars += 1;
    this.totalPages = this.pagination.calculateTotalPages(this.totalCars);
    this.updateGarageNumber(this.totalCars);
    this.pagination.updateTotalPages(this.totalPages);
    this.isNewCar = false;
  };

  // callbacks for updating the car
  private updateTextInputCallback = (): void => {
    if (!this.updateInputText.element.value) {
      this.disableUpdateElements();
    }
    this.carData.name = this.updateInputText.element.value;
  };

  private updateColorInputCallback = (): void => {
    this.carData.color = this.updateInputColor.element.value;
  };

  private updateBtnCallback = async (): Promise<void> => {
    const data: DataParams = await this.updateCar(this.carData);
    eventEmitter.emit('updateCar', data);
    this.disableUpdateElements();
    this.setUpdateElementsToDefault();
  };

  // pagination callbacks
  private rightArrowBtnCallback = (): void => {
    this.pagination.activateLeftArrowBtn();
    this.currentPageStatus.page += 1;
    this.pagination.updateCurrentPage(this.currentPageStatus.page);
    this.deleteAllRaceTracks();
    this.createTracksOnNextPrevPage();
    this.pagination.disableArrowsFirstLastPage(this.currentPageStatus.page);
  };

  private leftArrowBtnCallback = (): void => {
    this.isSlideBack = true;
    if (this.currentPageStatus.page === this.totalPages) {
      this.pagination.activateRightArrowBtn();
    }
    this.currentPageStatus.page -= 1;
    this.pagination.updateCurrentPage(this.currentPageStatus.page);
    this.deleteAllRaceTracks();
    this.createTracksOnNextPrevPage();
    this.pagination.disableArrowsFirstLastPage(this.currentPageStatus.page);
  };

  // race methods
  private raceBtnCallback = async (): Promise<void> => {
    this.tracksOnPage.forEach((track) => track.engine.setStatusToStarted());
    // eslint-disable-next-line max-len
    const requests = this.tracksOnPage.map(async (track) => turnEngineOnOff(track.engine.EngineState));
    const results = await Promise.all(requests);
    for (let i: number = 0; i < results.length; i += 1) {
      this.tracksOnPage[i].engine.startAnimation(results[i]);
      this.tracksOnPage[i].engine.switchToDrivingMode();
      this.tracksOnPage[i].engine.addEventListener();
    }
    eventEmitter.emit('startRace', {});
    this.disableCreateElements();
  };

  private announceWinner(data: DataParams): void {
    for (let i: number = 0; i < this.tracksOnPage.length; i += 1) {
      if (Number(this.tracksOnPage[i].element.id) === data.id) {
        // const { name } = this.tracksOnPage[i].carData;
        const time: string = GaragePage.calculateTime(this.tracksOnPage[i].engine.duration);
        this.tracksOnPage[i].showWinner(time);
      }
    }
  }

  private static calculateTime(num: number): string {
    const ms: number = 1000;
    const time: string = (num / ms).toFixed(2);
    return time;
  }

  // reset callback
  private resetBtnCallback = async (): Promise<void> => {
    this.tracksOnPage.forEach((track) => track.engine.setStatusToStopped());
    // eslint-disable-next-line max-len, prettier/prettier
    const requests: Promise<EngineResp>[] = this.tracksOnPage.map(async (track) => turnEngineOnOff(track.engine.EngineState));
    await Promise.all(requests).then(() => {
      this.tracksOnPage.forEach((track) => track.engine.stopAnimation());
    });
    eventEmitter.emit('stopDriving', {});
    this.disableResetBtn();
  };

  // generate 100 cars callback
  private generateBtnCallback = async (): Promise<void> => {
    this.isNewCar = true;
    const carsNumber: number = 100;
    const new100Cars: CarType[] = [];
    for (let i: number = 0; i < carsNumber; i += 1) {
      const newCarData: CarType = {
        name: '',
        color: '',
      };
      newCarData.name = createRandomCarName();
      newCarData.color = createRandomColor();
      new100Cars.push(newCarData);
    }
    const requests: Promise<CarType>[] = new100Cars.map(async (car) => GaragePage.createCar(car));
    const cars: CarType[] = await Promise.all(requests);
    cars.forEach((car) => this.createRaceTrack(car));
    this.totalCars += carsNumber;
    this.totalPages = this.pagination.calculateTotalPages(this.totalCars);
    this.updateGarageNumber(this.totalCars);
    this.pagination.updateTotalPages(this.totalPages);
    this.pagination.activateRightArrowBtn();
    this.isNewCar = false;
  };

  // useful methods
  private subscribeToEvents(): void {
    eventEmitter.on('selectCar', (data: DataParams): void => {
      this.activateUpdateElements();
      this.insertCarNameForChange(data);
      this.carData.name = String(data.name);
      this.id = Number(data.id);
    });

    eventEmitter.on('deleteCar', (data: DataParams): void => {
      this.totalCars -= 1;
      this.updateGarageNumber(this.totalCars);
      this.deleteOneRaceTrack(data);
    });

    eventEmitter.on('waitingToStart', (): void => {
      this.disableBtnsWhileDriving();
      this.disableCreateElements();
    });

    eventEmitter.on('stopDriving', (): void => {
      this.activateBtnsAfterDriving();
      this.activateCreateElements();
    });

    eventEmitter.on('broken', (): void => {
      this.finishCounter += 1;
      this.isRaceEnd();
    });

    eventEmitter.on('animationFinished', (data: DataParams): void => {
      this.finishCounter += 1;
      this.winnerCounter += 1;
      if (this.winnerCounter === 1) {
        this.announceWinner(data);
      }
      this.isRaceEnd();
    });
  }

  private isRaceEnd(): void {
    if (this.finishCounter === this.tracksOnPage.length) {
      this.activateCreateElements();
      this.activateBtnsAfterDriving();
      this.activateResetBtn();
    }
  }

  private insertCarNameForChange = (data: DataParams): void => {
    this.updateInputText.element.value = `${data.name}`;
  };

  private setUpdateElementsToDefault(): void {
    this.updateInputText.element.value = '';
    this.updateInputColor.element.value = '#000000';
  }

  private activateCreateElements(): void {
    this.createInputText?.element.removeAttribute('disabled');
    this.createInputColor?.element.removeAttribute('disabled');
    this.createBtn?.element.removeAttribute('disabled');
  }

  private disableCreateElements(): void {
    this.createInputText?.element.setAttribute('disabled', '');
    this.createInputColor?.element.setAttribute('disabled', '');
    this.createBtn?.element.setAttribute('disabled', '');
  }

  private activateUpdateElements(): void {
    this.updateInputText.element.removeAttribute('disabled');
    this.updateInputColor.element.removeAttribute('disabled');
    this.updateBtn.element.removeAttribute('disabled');

    this.updateInputText.element.addEventListener('input', this.updateTextInputCallback);
    this.updateInputColor.element.addEventListener('input', this.updateColorInputCallback);
    this.updateBtn.element.addEventListener('click', this.updateBtnCallback);
  }

  private disableUpdateElements(): void {
    this.updateInputText.element.setAttribute('disabled', '');
    this.updateInputColor.element.setAttribute('disabled', '');
    this.updateBtn.element.setAttribute('disabled', '');
  }

  private disableBtnsWhileDriving(): void {
    this.raceBtn?.element.setAttribute('disabled', '');
    this.generateBtn?.element.setAttribute('disabled', '');
  }

  private activateBtnsAfterDriving(): void {
    this.raceBtn?.element.removeAttribute('disabled');
    this.generateBtn?.element.removeAttribute('disabled');
  }

  private disableResetBtn(): void {
    this.resetBtn?.element.setAttribute('disabled', '');
  }

  private activateResetBtn(): void {
    this.resetBtn?.element.removeAttribute('disabled');
  }

  // eslint-disable-next-line prettier/prettier
  private static getCars = (params: DataParams): Promise<PageType<CarType>> => Loader.getPageData('GET', 'garage', params);

  private static getBackup = (params: DataParams): Promise<CarsData> => Loader.getAndPatchData('GET', 'garage', params);

  private static createCar = (params: DataParams): Promise<CarType> => Loader.postAndPutData('POST', 'garage', params);

  // eslint-disable-next-line prettier/prettier
  private updateCar = (data: DataParams): Promise<DataParams> => Loader.postAndPutData('PUT', `garage/${this.id}`, data);

  private createAllCarsBackup = async (): Promise<void> => {
    await GaragePage.getBackup(this.currentPageStatus).then((cars: CarsData) => {
      cars.forEach((car) => {
        const track: RaceTrack = new RaceTrack(car);
        track.element.setAttribute('id', `${car.id}`);
        this.allTracks.push(track);
        this.totalCars = this.allTracks.length;
      });
    });
  };

  // functions to render elements
  private static createSettingsInput(data: Settings): BaseComponent<'input'> {
    const txtInput = new BaseComponent('input', data.parent.element, `settings__${data.name}_input-${data.type}`, '', {
      type: `${data.type}`,
    });
    return txtInput;
  }

  private static createSettingsBtn(data: Settings): BaseComponent<'button'> {
    const button = new BaseComponent('button', data.parent.element, `settings__${data.name}_btn`, `${data.name}`, {
      type: `${data.type}`,
    });
    return button;
  }

  // creating block with race
  private renderRaceBlock(cars: CarType[]): void {
    this.raceField = new BaseComponent('div', this.raceFieldWrapper?.element, 'garage__race-field race');

    cars.forEach((car) => {
      this.createRaceTrack(car);
    });
  }

  private createRaceTrack(car: CarType): void {
    const track: RaceTrack = new RaceTrack(car);
    if (this.tracksOnPage.length < this.currentPageStatus.limit) {
      this.raceField?.element.append(track.element);
      this.tracksOnPage.push(track);
    }
    track.element.setAttribute('id', `${car.id}`);
    if (this.isNewCar === true) {
      this.allTracks.push(track);
    }
    this.updateGarageNumber(this.totalCars);
  }

  private deleteOneRaceTrack(data: DataParams): void {
    if (this.raceField) {
      for (let i: number = 0; i < this.raceField.element.children.length; i += 1) {
        if (Number(this.raceField.element.children[i].id) === data.id) {
          this.raceField.element.removeChild(this.raceField.element.children[i]);
        }
      }
      this.updateCurrentTrackArray(String(data.id));
      this.updateAllTracksArray(String(data.id));
      if (this.currentPageStatus.page !== this.totalPages) {
        this.recreateRaceTrackAfterDeletion();
      }
      this.totalPages = this.pagination.calculateTotalPages(this.totalCars);
      this.pagination.updateTotalPages(this.totalPages);
      this.checkIfZero();
    }
  }

  private checkIfZero(): void {
    if (this.tracksOnPage.length === 0) {
      this.currentPageStatus.page -= 1;
      this.pagination.updateCurrentPage(this.currentPageStatus.page);
      this.isUpdatePage = true;
      this.createTracksOnNextPrevPage();
    }
  }

  private deleteAllRaceTracks(): void {
    this.tracksOnPage = [];
    if (this.raceField) {
      let idx: number = this.raceField.element.children.length - 1;
      while (this.raceField.element.children.length > 0 && idx >= 0) {
        this.raceField.element.removeChild(this.raceField.element.children[idx]);
        idx -= 1;
      }
    }
  }

  private updateCurrentTrackArray(id: string): void {
    this.tracksOnPage = this.tracksOnPage.filter((track) => track.element.id !== id);
  }

  private updateAllTracksArray(id: string): void {
    this.allTracks = this.allTracks.filter((track) => track.element.id !== id);
  }

  private recreateRaceTrackAfterDeletion(): void {
    const idx: number = this.currentPageStatus.limit * this.currentPageStatus.page - 1;
    const nextTrack: RaceTrack = this.allTracks[idx];
    this.tracksOnPage.push(nextTrack);
    this.raceField?.element.append(nextTrack.element);
  }

  private createTracksOnNextPrevPage(): void {
    let nextPageTracks: RaceTrack[] = [];

    if (this.isSlideBack === false && this.isUpdatePage === false) {
      this.startIdx += this.currentPageStatus.limit;
      this.endIdx = this.startIdx + this.currentPageStatus.limit;
    } else if (this.isSlideBack === true) {
      this.endIdx = this.startIdx;
      this.startIdx -= this.currentPageStatus.limit;
      this.isSlideBack = false;
    } else if (this.isUpdatePage === true) {
      this.startIdx = this.currentPageStatus.limit * (this.currentPageStatus.page - 1);
      this.endIdx = this.startIdx + this.currentPageStatus.limit;
      this.isUpdatePage = false;
    }

    if (this.allTracks.slice(this.startIdx).length <= this.currentPageStatus.limit) {
      nextPageTracks = this.allTracks.slice(this.startIdx);
    } else {
      nextPageTracks = this.allTracks.slice(this.startIdx, this.endIdx);
    }

    nextPageTracks.forEach((track) => {
      this.raceField?.element.append(track.element);
      this.tracksOnPage.push(track);
    });
  }
}
