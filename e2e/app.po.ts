import { browser, by, element } from "protractor";

export class Pk2ProAngularPage {
    navigateTo() {
        return browser.get("/");
    }

    getParagraphText() {
        let t: string;
        element(by.css("app-root a"))
            .getText()
            .then((data) => {
                t = data;
            });
        return t;
    }
}
