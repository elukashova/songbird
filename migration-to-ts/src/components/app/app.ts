import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IApp, ArticleInfo, SourcesInfo } from './app.types';

class App implements IApp {
    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector('.sources');
        if (sources) {
            sources.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: ArticleInfo | undefined) => {
                    if (data) {
                        this.view.drawNews(data);
                    }
                })
            );
            this.controller.getSources((data: SourcesInfo | undefined) => {
                if (data) {
                    this.view.drawSources(data);
                }
            });
        }
    }
}

export default App;
