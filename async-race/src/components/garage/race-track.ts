import './race-track.styles.css';
import BaseComponent from '../base-component';
import { Settings, CarType } from './race-track.types';

export default class RaceTrack extends BaseComponent<'div'> {
  private selectBtn: BaseComponent<'button'> | null = null;

  private deleteBtn: BaseComponent<'button'> | null = null;

  private carNameElemenet: BaseComponent<'span'> | null = null;

  private startBtn: BaseComponent<'button'> | null = null;

  private stopBtn: BaseComponent<'button'> | null = null;

  constructor(data: CarType) {
    super('div', undefined, 'race__track');
    this.render(data);
  }

  // eslint-disable-next-line max-lines-per-function
  private render(data: CarType): void {
    const topLinePart: BaseComponent<'div'> = new BaseComponent('div', this.element, 'race__track-top');
    this.selectBtn = RaceTrack.createBtn({ parent: topLinePart, name: 'select', type: 'submit' });
    this.deleteBtn = RaceTrack.createBtn({ parent: topLinePart, name: 'delete', type: 'submit' });
    this.carNameElemenet = new BaseComponent('span', topLinePart.element, 'race__car-name', `${data.name}`);

    const bottomLinePart: BaseComponent<'div'> = new BaseComponent('div', this.element, 'race__track-bottom');
    const btnsWrapper: BaseComponent<'div'> = new BaseComponent(
      'div',
      bottomLinePart.element,
      'race__track-bottom__btns',
    );
    this.startBtn = RaceTrack.createBtn({ parent: btnsWrapper, name: 'start', type: 'submit' });
    this.stopBtn = RaceTrack.createBtn({ parent: btnsWrapper, name: 'stop', type: 'submit' });

    const trackLine: BaseComponent<'div'> = new BaseComponent('div', bottomLinePart.element, 'race__track-line');
    const car: Element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    car.classList.add('race__car');
    car.setAttribute('id', `${data.id}`);
    car.setAttribute('fill', 'none');
    car.setAttribute('width', '102');
    car.setAttribute('height', '88');
    car.setAttribute('viewBox', '0 0 102 88');
    RaceTrack.createMainSVGPathes(car, `${data.color}`);
    trackLine.element.append(car);

    const clock: Element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    clock.classList.add('race__end'); // TODO: refactor this part
    clock.setAttribute('fill', 'none');
    clock.setAttribute('width', '42');
    clock.setAttribute('height', '76');
    clock.setAttribute('viewBox', '0 0 42 76');
    const clockPath1: Element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    clockPath1.setAttribute('fill-rule', 'evenodd');
    clockPath1.setAttribute('clip-rule', 'evenodd');
    clockPath1.setAttribute(
      'd',
      'M1.61544 5.4018e-05C1.18706 5.4018e-05 0.775981 0.167113 0.473092 0.464408C0.170202 0.761703 0 1.16519 0 1.58565V4.71825V4.75825V74.4144C0 74.8349 0.170202 75.2384 0.473092 75.5357C0.775981 75.8329 1.18706 76 1.61544 76C2.04417 76.0004 2.45561 75.8337 2.75889 75.536C3.06214 75.2387 3.2327 74.8352 3.2327 74.4144V6.34384H16.1525V11.0234C11.375 13.3654 8.07346 18.2 8.07346 23.7825C8.07346 31.645 14.6063 38.0565 22.617 38.0565C30.6277 38.0565 37.1541 31.6455 37.1541 23.7825C37.1541 18.1997 33.8547 13.3656 29.0784 11.0234L29.0787 6.34384H40.3849C40.8133 6.34384 41.224 6.17678 41.5269 5.87948C41.8298 5.58219 42 5.17906 42 4.75824C42.0004 4.33742 41.8305 3.93393 41.5276 3.63627C41.2244 3.33861 40.8133 3.17121 40.3845 3.17121H3.23139V1.58561C3.23139 1.16479 3.06083 0.761305 2.75758 0.464001C2.45432 0.166343 2.04289 -0.000352801 1.61412 5.60646e-07L1.61544 5.4018e-05ZM19.3852 6.3439H25.8484V9.8835C24.8075 9.65026 23.7289 9.51506 22.6176 9.51506C21.5055 9.51506 20.4267 9.64991 19.3852 9.8835V6.3439ZM22.6176 12.6863C28.882 12.6863 33.9219 17.6338 33.9219 23.7819C33.9219 29.9299 28.8816 34.8847 22.6176 34.8847C16.3536 34.8847 11.3058 29.9311 11.3058 23.7819C11.3058 17.6326 16.3523 12.6863 22.6176 12.6863ZM22.6176 15.8543C22.1888 15.8543 21.7785 16.0217 21.4756 16.319C21.1727 16.6163 21.0025 17.0195 21.0025 17.4403V22.1985H17.7698C17.3414 22.1985 16.9303 22.3656 16.6274 22.6629C16.3245 22.9602 16.1543 23.3637 16.1543 23.7841C16.1543 24.2046 16.3245 24.6081 16.6274 24.9054C16.9303 25.2027 17.3414 25.3697 17.7698 25.3697H22.6179C23.0463 25.3697 23.457 25.2027 23.7599 24.9054C24.0628 24.6081 24.233 24.2046 24.2334 23.7841V17.4403C24.2334 17.0195 24.0632 16.6163 23.7599 16.319C23.457 16.0217 23.0459 15.8543 22.6176 15.8543Z',
    );
    clockPath1.setAttribute('fill', '#62432C');
    const clockPath2: Element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    clockPath2.setAttribute('fill-rule', 'evenodd');
    clockPath2.setAttribute('clip-rule', 'evenodd');
    clockPath2.setAttribute(
      'd',
      'M22.6176 12.6863C28.882 12.6863 33.9219 17.6338 33.9219 23.7819C33.9219 29.9299 28.8816 34.8847 22.6176 34.8847C16.3536 34.8847 11.3058 29.9311 11.3058 23.7819C11.3058 17.6326 16.3523 12.6863 22.6176 12.6863ZM21.4756 16.319C21.7785 16.0217 22.1888 15.8543 22.6176 15.8543C23.0459 15.8543 23.457 16.0217 23.7599 16.319C24.0632 16.6163 24.2334 17.0195 24.2334 17.4403V23.7841C24.233 24.2046 24.0628 24.6081 23.7599 24.9054C23.457 25.2027 23.0463 25.3697 22.6179 25.3697H17.7698C17.3414 25.3697 16.9303 25.2027 16.6274 24.9054C16.3245 24.6081 16.1543 24.2046 16.1543 23.7841C16.1543 23.3637 16.3245 22.9602 16.6274 22.6629C16.9303 22.3656 17.3414 22.1985 17.7698 22.1985H21.0025V17.4403C21.0025 17.0195 21.1727 16.6163 21.4756 16.319Z',
    );
    clockPath2.setAttribute('fill', 'white');
    clock.append(clockPath1);
    clock.append(clockPath2);
    trackLine.element.append(clock);
  }

  private static createBtn(data: Settings): BaseComponent<'button'> {
    const button = new BaseComponent('button', data.parent.element, `race__${data.name}_btn`, `${data.name}`, {
      type: `${data.type}`,
    });
    return button;
  }

  private static createMainSVGPathes(svg: Element, color: string): void {
    // eslint-disable-next-line prettier/prettier
    const string1: string = 'M73.3864 78.184C73.3864 77.5298 72.9506 77.0932 72.2957 77.0932L59.8646 77.094C58.9922 77.094 58.2293 76.9852 57.4657 76.6581L55.9391 76.1127L49.6145 73.8224C49.7233 73.7137 49.8328 73.4954 49.8328 73.3866C50.1599 72.4054 49.9416 71.3145 49.1787 70.5516L46.0168 67.3897C45.908 67.281 45.908 67.0627 45.908 67.0627C45.908 66.9539 45.908 66.8444 46.0168 66.7356L54.7405 58.0119C56.4854 56.267 57.4666 53.9774 57.4666 51.4688C57.4666 48.961 56.4854 46.6707 54.7405 44.9258L49.07 39.2553C48.8517 39.037 48.8517 38.7099 49.07 38.4916L51.7961 35.7655C52.1232 36.8563 52.7773 37.7279 53.541 38.6005L60.7373 45.7968C61.6098 46.6692 62.6997 47.1051 63.7906 47.1051C64.8813 47.1051 65.9713 46.6692 66.8438 45.7968C68.4792 44.1614 68.4792 41.3258 66.8438 39.6905L60.3016 33.1483C60.1928 33.0395 60.0832 32.8212 60.1928 32.6029L62.4831 23.9888C62.7014 23.0076 62.5919 22.0264 62.4831 21.0444C63.3555 21.3715 64.3367 21.4802 65.4275 21.4802C69.3531 21.4802 72.7334 18.9724 74.0416 15.5922C74.0416 15.5922 74.0416 15.4835 74.1504 15.4835C74.4774 14.5022 74.6957 13.5211 74.6957 12.4302C74.6957 11.3395 74.4774 10.2495 74.1504 9.377C72.5142 5.66969 69.1339 3.16187 65.2083 3.16187C64.5542 3.16187 64.0088 3.27064 63.3547 3.38017C63.3547 1.52652 61.8281 0 59.9745 0C58.1209 0 56.5943 1.52658 56.5943 3.38017C56.5943 4.68847 57.2485 5.77915 58.3392 6.32456C56.9214 7.95991 56.0489 10.0319 56.0489 12.4308C56.0489 13.4121 56.2672 14.3932 56.4847 15.3752C56.376 15.3752 56.2664 15.3752 56.1577 15.2665C53.7587 14.8306 51.2509 15.5935 49.506 17.3385L36.4209 30.4236C35.0031 31.8414 34.2402 33.8038 34.2402 35.767C34.2402 37.839 35.0039 39.6925 36.4209 41.1103L46.2345 50.9239C46.3432 51.0327 46.3432 51.251 46.3432 51.251C46.3432 51.3597 46.3432 51.4693 46.2345 51.578L33.9123 64.1171C33.1486 64.8808 32.7128 65.9708 32.7128 67.0615C32.7128 67.2798 32.7128 67.4974 32.8215 67.7157L10.9037 59.7557H15.0475C20.718 59.7557 26.3877 60.5193 31.7313 62.1546C32.2767 62.3729 32.9308 61.9363 33.0396 61.3909C33.2579 60.8456 32.8213 60.1914 32.2759 60.0826C28.2415 58.8831 23.9887 58.1202 19.8449 57.7923L16.1383 54.1939C16.0296 54.0851 16.0296 53.9756 16.0296 53.8668C16.0296 53.5397 16.2479 53.3214 16.5749 53.3214H22.7909H23.0092L35.7665 57.9019C36.3119 58.1202 36.9661 57.7931 37.1843 57.2477C37.4026 56.7023 37.0756 56.0482 36.5302 55.8299L23.6634 51.1414C23.3363 51.0326 23.0092 50.9231 22.6822 50.9231H16.4662C14.9397 50.9231 13.7401 52.1226 13.7401 53.6492C13.7401 54.4129 14.0672 55.067 14.5038 55.6116L16.4662 57.574H14.8309H8.61497C8.2879 57.574 8.0696 57.6828 7.85129 57.9011L6.76054 58.9918C2.39917 63.3532 0 69.2422 0 75.4573C0 76.1115 0.435846 76.5481 1.09075 76.5481C1.7449 76.5481 2.18151 76.1122 2.18151 75.4573C2.18151 70.0051 4.25354 64.9887 7.96085 60.9544L18.7564 64.88L17.884 65.7525L17.5569 65.4254C17.121 64.9896 16.4661 64.9896 16.0303 65.4254C15.5945 65.8612 15.5945 66.5162 16.0303 66.952L16.3574 67.2791L14.722 68.9144L14.3934 68.5881C13.9576 68.1523 13.3027 68.1523 12.8669 68.5881C12.431 69.0239 12.431 69.6788 12.8669 70.1147L13.1939 70.4417L11.5586 72.0771L11.2315 71.75C10.7957 71.3142 10.1408 71.3142 9.70493 71.75C9.26908 72.1859 9.26908 72.8408 9.70493 73.2766L10.032 73.6037L8.39665 75.239L7.96081 74.912C7.52496 74.4761 6.87005 74.5849 6.43423 75.0207C5.99838 75.4566 6.10715 76.1115 6.543 76.5473L6.97884 76.9831C6.65177 77.5285 6.43347 78.1827 6.3247 78.8368H5.77932C5.12517 78.8368 4.68856 79.3822 4.68856 79.9276C4.68856 80.4729 5.23394 81.0183 5.77932 81.0183H6.3247C6.43346 81.6725 6.76054 82.3266 7.08837 82.872L6.65253 83.3078C6.21668 83.7437 6.21668 84.3986 6.65253 84.8344C6.87083 85.0527 7.1979 85.1615 7.41621 85.1615C7.74328 85.1615 7.96159 85.0527 8.17989 84.8344L8.61573 84.3985C9.16111 84.8344 9.81526 85.0527 10.4694 85.271V85.8164C10.4694 86.4705 10.9052 86.9071 11.4506 87.0159H11.5594C12.1048 87.0159 12.6501 86.58 12.6501 86.0347V85.4893H14.9404V85.9251C14.9404 86.5793 15.3763 87.0159 16.0312 87.0159C16.6853 87.0159 17.122 86.58 17.122 85.9251V85.4893H19.4123V85.9251C19.4123 86.5793 19.8481 87.0159 20.503 87.0159C21.1572 87.0159 21.5938 86.58 21.5938 85.9251V85.4893H23.8841V85.9251C23.8841 86.5793 24.3199 87.0159 24.9748 87.0159C25.629 87.0159 26.0656 86.58 26.0656 85.9251V85.4893H28.3559V85.9251C28.3559 86.5793 28.7918 87.0159 29.4467 87.0159C30.1008 87.0159 30.5374 86.58 30.5374 85.9251V85.4893H32.8277V85.9251C32.8277 86.5793 33.2636 87.0159 33.9185 87.0159C34.5726 87.0159 35.0092 86.58 35.0092 85.9251V85.4893H37.2996V85.9251C37.2996 86.5793 37.7354 87.0159 38.3903 87.0159C39.0445 87.0159 39.4811 86.58 39.4811 85.9251V85.4893H41.7714V85.9251C41.7714 86.5793 42.2072 87.0159 42.8621 87.0159C43.5163 87.0159 43.9529 86.58 43.9529 85.9251V85.4893H44.28C44.9341 85.4893 45.5883 85.3805 46.1336 85.271L46.2424 85.8164C46.3512 86.2522 46.7878 86.58 47.3331 86.58H47.6602C48.2056 86.3617 48.5327 85.8164 48.4239 85.2718L48.3151 84.8359C48.9693 84.5088 49.6234 84.1818 50.1688 83.8547L50.4958 84.2905C50.7142 84.5088 51.0412 84.7264 51.3683 84.7264C51.5866 84.7264 51.9137 84.6176 52.0224 84.5081C52.4583 84.0722 52.5678 83.4173 52.1312 82.9815L51.8041 82.5456L53.4395 80.9103L53.7666 81.2374C53.9849 81.4557 54.3119 81.5644 54.5302 81.5644C54.7485 81.5644 55.0756 81.4557 55.2939 81.2374C55.7298 80.8015 55.7298 80.1466 55.2939 79.7108L54.9669 79.3837L55.621 78.7296L56.6022 79.0566C57.5834 79.3837 58.6743 79.602 59.7641 79.602H72.3038C72.9503 79.2742 73.3864 78.8389 73.3864 78.184ZM66.8434 12.9756L71.8598 14.8292V14.938C71.2057 16.5733 69.6791 17.6641 67.9342 17.7729C66.7347 17.7729 65.6439 17.4459 64.6627 16.5734C64.0085 15.9193 63.4632 15.1556 63.3544 14.2831L66.8434 12.9756ZM59.9742 2.18057C60.6283 2.18057 61.1737 2.72595 61.1737 3.38009C61.1737 4.03424 60.6283 4.57962 59.9742 4.57962C59.32 4.57962 58.7747 4.03424 58.7747 3.38009C58.7747 2.72519 59.3193 2.18057 59.9742 2.18057ZM65.2081 5.34246C67.8254 5.34246 70.1149 6.76027 71.3144 8.94092L61.6095 12.4307C61.5007 12.4307 61.5007 12.5395 61.3912 12.5395C61.2824 12.5395 61.2824 12.6483 61.2824 12.6483C61.2824 12.6483 61.1736 12.757 61.1736 12.8666C61.1736 12.9753 61.0648 12.9753 61.0648 13.0849V13.3032V13.5215V13.6302C61.1736 15.3751 61.9373 17.0104 63.2455 18.2101C63.7909 18.7555 64.4451 19.0825 65.2079 19.4096C61.391 19.3008 58.338 16.2477 58.338 12.4308C58.2292 8.50442 61.3914 5.34246 65.2081 5.34246ZM35.4391 68.479C35.112 68.152 34.8937 67.6066 34.8937 67.0612C34.8937 66.5159 35.112 65.9705 35.4391 65.6434L47.7605 53.322C48.8512 52.2313 48.8512 50.5959 47.7605 49.5051L37.9469 39.6915C35.8748 37.6195 35.8748 34.1304 37.9469 32.0586L51.032 18.9735C52.2315 17.774 54.0852 17.1198 55.8301 17.4469C57.2479 17.6652 58.4474 18.5377 59.3199 19.6276C60.1924 20.7183 60.4107 22.2449 60.1924 23.5532L57.9021 32.0586C57.6838 33.0399 57.9021 34.021 58.5562 34.6759L63.0272 39.1469L59.974 42.2001L54.8489 37.0751C53.5406 35.7668 52.9952 33.6949 53.4311 31.8411L55.6118 23.7717C55.7205 23.2263 55.3935 22.5721 54.8481 22.4634C54.3027 22.3546 53.6486 22.6817 53.5398 23.227L51.3591 31.2965C51.1408 31.9507 51.1408 32.496 51.1408 33.1502L47.4335 36.9655C46.3428 38.0563 46.3428 39.6916 47.4335 40.7825L53.104 46.453C54.4123 47.7613 55.176 49.5062 55.176 51.4694C55.176 53.323 54.4123 55.0678 53.104 56.4858L45.144 64.4458L43.0719 62.3738C42.6361 61.938 41.9812 61.938 41.5454 62.3738C41.1095 62.8096 41.1095 63.4646 41.5454 63.9004L43.8357 66.1907C43.8349 66.193 43.8342 66.1952 43.8334 66.1975C43.7254 66.5223 43.6174 66.8471 43.6174 67.1719C43.6174 67.9356 43.9444 68.5897 44.381 69.1343L47.5429 72.2962C47.6517 72.405 47.7612 72.6233 47.6517 72.8416C47.5429 73.1687 47.2159 73.2774 46.9976 73.1687L36.0931 69.2431C35.8755 68.917 35.6579 68.6986 35.441 68.481L35.4391 68.479ZM21.4806 66.0808C22.5714 66.0808 23.443 66.9533 23.443 68.0432C23.443 69.134 22.5706 70.0056 21.4806 70.0056C20.3899 70.0056 19.5182 69.1332 19.5182 68.0432C19.5182 66.9525 20.3907 66.0808 21.4806 66.0808ZM11.994 83.3092C10.0316 83.3092 8.39552 81.6739 8.39552 79.7108C8.39552 77.7484 10.0309 76.1123 11.994 76.1123C13.9564 76.1123 15.5924 77.7477 15.5924 79.7108C15.5924 81.6739 13.9571 83.3092 11.994 83.3092ZM41.2178 83.3092C40.1271 83.3092 39.2554 82.4368 39.2554 81.3468C39.2554 80.2561 40.1279 79.3844 41.2178 79.3844C42.3086 79.3844 43.1802 80.2569 43.1802 81.3468C43.1802 82.4376 42.3078 83.3092 41.2178 83.3092ZM35.1108 83.3092C34.02 83.3092 33.1483 82.4368 33.1483 81.3468C33.1483 80.2561 34.0208 79.3844 35.1108 79.3844C36.2015 79.3844 37.0732 80.2569 37.0732 81.3468C37.0739 82.4376 36.2015 83.3092 35.1108 83.3092ZM50.159 80.9103C49.1778 81.8915 47.9784 82.5456 46.6692 82.9823C46.1239 83.2006 45.4697 83.2006 44.9244 83.3094C45.2514 82.764 45.4697 82.0011 45.4697 81.347C45.4697 79.0566 43.6161 77.2031 41.3259 77.2031C40.1263 77.2031 39.0355 77.7485 38.2726 78.6209C37.5089 77.7484 36.419 77.2031 35.2194 77.2031C32.9291 77.2031 31.0755 79.0567 31.0755 81.347C31.0755 82.1106 31.2938 82.7648 31.6209 83.3094H16.4645C17.2282 82.3281 17.7728 81.1287 17.7728 79.7109C17.7728 76.7665 15.5921 74.3675 12.6478 74.0404L17.5546 69.1336C18.0999 70.8785 19.6266 72.1869 21.589 72.1869C23.8793 72.1869 25.7329 70.3332 25.7329 68.043C25.7329 67.8247 25.7329 67.6071 25.6241 67.3888L53.5394 77.5296L50.159 80.9103Z';
    // eslint-disable-next-line prettier/prettier
    const string2: string = 'M35.4391 68.479C35.112 68.152 34.8937 67.6066 34.8937 67.0612C34.8937 66.5159 35.112 65.9705 35.4391 65.6434L47.7605 53.322C48.8512 52.2313 48.8512 50.5959 47.7605 49.5051L37.9469 39.6915C35.8748 37.6195 35.8748 34.1304 37.9469 32.0586L51.032 18.9735C52.2315 17.774 54.0852 17.1198 55.8301 17.4469C57.2479 17.6652 58.4474 18.5377 59.3199 19.6276C60.1924 20.7183 60.4107 22.2449 60.1924 23.5532L57.9021 32.0586C57.6838 33.0399 57.9021 34.021 58.5562 34.6759L63.0272 39.1469L59.974 42.2001L54.8489 37.0751C53.5406 35.7668 52.9952 33.6949 53.4311 31.8411L55.6118 23.7717C55.7205 23.2263 55.3935 22.5721 54.8481 22.4634C54.3027 22.3546 53.6486 22.6817 53.5398 23.227L51.3591 31.2965C51.1408 31.9507 51.1408 32.496 51.1408 33.1502L47.4335 36.9655C46.3428 38.0563 46.3428 39.6916 47.4335 40.7825L53.104 46.453C54.4123 47.7613 55.176 49.5062 55.176 51.4694C55.176 53.323 54.4123 55.0678 53.104 56.4858L45.144 64.4458L43.0719 62.3738C42.6361 61.938 41.9812 61.938 41.5454 62.3738C41.1095 62.8096 41.1095 63.4646 41.5454 63.9004L43.8357 66.1907L43.8334 66.1975C43.7254 66.5223 43.6174 66.8471 43.6174 67.1719C43.6174 67.9356 43.9444 68.5897 44.381 69.1343L47.5429 72.2962C47.6517 72.405 47.7612 72.6233 47.6517 72.8416C47.5429 73.1687 47.2159 73.2774 46.9976 73.1687L36.0931 69.2431C35.8755 68.917 35.6579 68.6986 35.441 68.481L35.4391 68.479Z';
    // eslint-disable-next-line prettier/prettier
    const string3: string = 'M65.2081 5.34246C67.8254 5.34246 70.1149 6.76027 71.3144 8.94092L61.6095 12.4307C61.5007 12.4307 61.5007 12.5395 61.3912 12.5395C61.2824 12.5395 61.2824 12.6483 61.2824 12.6483C61.2824 12.6483 61.1736 12.757 61.1736 12.8666C61.1736 12.9753 61.0648 12.9753 61.0648 13.0849V13.3032V13.5215V13.6302C61.1736 15.3751 61.9373 17.0104 63.2455 18.2101C63.7909 18.7555 64.4451 19.0825 65.2079 19.4096C61.391 19.3008 58.338 16.2477 58.338 12.4308C58.2292 8.50442 61.3914 5.34246 65.2081 5.34246Z';
    // eslint-disable-next-line prettier/prettier
    const string4: string = 'M59.9742 2.18057C60.6283 2.18057 61.1737 2.72595 61.1737 3.38009C61.1737 4.03424 60.6283 4.57962 59.9742 4.57962C59.32 4.57962 58.7747 4.03424 58.7747 3.38009C58.7747 2.72519 59.3193 2.18057 59.9742 2.18057Z';
    // eslint-disable-next-line prettier/prettier
    const string5: string = 'M72.9503 61.8273L76.3305 67.7153C76.4393 67.9336 76.7663 68.0424 77.0942 67.9336C77.3125 67.8249 77.4212 67.4978 77.3125 67.17L73.714 60.9556C73.6052 60.7373 73.3869 60.7373 73.2782 60.7373H68.6983C68.5895 60.7373 68.3712 60.8461 68.2625 60.8461L59.8659 69.2427C59.6476 69.461 59.6476 69.6785 59.7571 69.8968L61.1749 72.2958C61.2837 72.5141 61.502 72.5141 61.6108 72.5141H68.6982C69.0253 72.5141 69.2436 72.2958 69.2436 71.9687C69.2436 71.6416 69.0253 71.4233 68.6982 71.4233H61.9369L60.9557 69.6785L68.9157 61.7184H72.9502L72.9503 61.8273Z';
    // eslint-disable-next-line prettier/prettier
    const string6: string = 'M70.4423 38.8191C70.3335 38.6008 70.0064 38.492 69.6786 38.6008C69.4603 38.7095 69.3515 39.0366 69.4603 39.3644C70.1145 40.4552 70.3328 41.6548 70.3328 42.8542C70.3328 44.5991 69.5691 46.344 68.2607 47.5428C67.497 48.3064 66.6254 48.7423 65.6435 49.0693C65.0981 48.9606 64.5527 48.9606 63.8986 48.851C62.4808 48.7423 61.1725 48.9598 59.973 49.7235C59.4276 50.0506 59.2093 50.7047 59.5372 51.2501C59.8642 51.7954 60.5184 51.9042 61.0637 51.6859C61.8274 51.2501 62.8086 51.0318 63.681 51.1405C74.9125 52.2313 85.2717 57.5739 92.9048 65.9705H88.4338C87.6701 65.9705 86.9072 66.6247 86.9072 67.4971C86.9072 68.2608 87.5614 68.9149 88.4338 68.9149H92.9048C90.1787 72.5134 86.4714 75.1308 82.1093 76.3295C81.5639 76.5478 81.2368 77.0932 81.3456 77.6378C81.4543 78.0737 81.8909 78.4015 82.4363 78.4015H82.7634C87.6702 76.9837 91.9229 73.9305 94.9761 69.7874C95.1944 69.4603 95.3032 69.1333 95.5215 68.8062H96.2852C97.0489 68.8062 97.8118 68.152 97.8118 67.3884C97.8118 66.6247 97.1576 65.8618 96.2852 65.8618H95.5215C95.3032 65.426 95.0857 64.9894 94.7578 64.5535C90.178 59.4284 84.6171 55.394 78.5101 52.6679L70.4423 38.8191ZM69.0245 48.4144C70.5511 46.9966 71.4235 45.0342 71.4235 42.9622V42.8534L76.7668 52.0129C73.8224 50.8134 70.7692 49.9409 67.6073 49.3956C68.1527 49.1781 68.6974 48.851 69.0245 48.4144Z';
    // eslint-disable-next-line prettier/prettier
    const string7: string = 'M61.0637 51.6859C60.5184 51.9042 59.8642 51.7954 59.5372 51.2501V54V55L48 67.3884L51.5 71.5V73L59 76H74.5L82.1093 76.3295C86.4714 75.1308 90.1787 72.5134 92.9048 68.9149H88.4338C87.5614 68.9149 86.9072 68.2608 86.9072 67.4971C86.9072 66.6247 87.6701 65.9705 88.4338 65.9705H92.9048C85.2717 57.5739 74.9125 52.2313 63.681 51.1405C62.8086 51.0318 61.8274 51.2501 61.0637 51.6859Z';
    // eslint-disable-next-line prettier/prettier
    const string8: string = 'M101.411 79.7106C99.6659 77.9657 96.9398 77.9657 95.1949 79.7106L90.0699 84.8357H82.8727L71.5333 65.3168C71.2062 64.7714 70.5521 64.6626 70.0067 64.8809C69.4614 65.208 69.3526 65.8621 69.5709 66.4075L80.257 84.8361H72.297C71.6428 84.8361 71.2062 85.272 71.2062 85.9269C71.2062 86.581 71.6421 87.0177 72.297 87.0177H93.7787C97.1589 87.0177 100.322 85.0552 101.739 82.0012C102.175 81.2375 102.065 80.2553 101.411 79.7106ZM93.8866 84.8349H93.1229L96.7214 81.2364C97.5938 80.364 98.9021 80.364 99.7746 81.1277C98.6846 83.418 96.3952 84.8349 93.8866 84.8349Z';
    const pathes: string[][] = [
      [string1, 'black'],
      [string2, `${color}`],
      [string3, `${color}`],
      [string4, `${color}`],
      [string5, 'black'],
      [string6, 'black'],
      [string7, `${color}`],
      [string8, 'black'],
    ];

    pathes.forEach((dataSet) => {
      const path: Element = RaceTrack.setPathData(dataSet);
      svg.append(path);
    });
  }

  private static setPathData(data: string[]): Element {
    const svgPath: Element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgPath.setAttribute('d', data[0]);
    svgPath.setAttribute('fill', data[1]);
    return svgPath;
  }
}
