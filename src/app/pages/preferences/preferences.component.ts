import { Component, OnInit } from "@angular/core";
import PreferenceModel from "app/components/preference-card/preference-card.model";

@Component({
    templateUrl: "./preferences.component.html",
    styleUrls: ["./preferences.component.scss"]
})
export class PreferencesComponent implements OnInit {
    preferences: PreferenceModel[] = new Array<PreferenceModel>();
    constructor() {}

    ngOnInit(): void {
        this.populatePreferences();
    }
  
   onCardSelected(id: number){
     let preference = this.preferences.find(x => x.id == id);
     if (preference) {
       preference.isSelected = !preference.isSelected;
     }
   }

    private populatePreferences(): void {
        this.preferences.push({
            id: 1,
            description: "Sport Activities",
            backgroundIamge: "assets/img/sections/forest-bg.jpg",
            icon: "user-run",
            isSelected: false,
            title: "Sport"
        });
        this.preferences.push({
            id: 2,
            description: "Music Events",
            backgroundIamge: "assets/img/sections/anders-jilden.jpg",
            icon: "note-03",
            isSelected: false,
            title: "Music"
        });
        this.preferences.push({
            id: 3,
            description: "Party events",
            backgroundIamge: "assets/img/sections/daniel-olahs.jpg",
            icon: "air-baloon",
            isSelected: false,
            title: "Party"
        });
        this.preferences.push({
            id: 4,
            description: "Hang over",
            backgroundIamge: "assets/img/sections/forest-bg.jpg",
            icon: "satisfied",
            isSelected: false,
            title: "Hang Over"
        });
        this.preferences.push({
          id: 5,
          description: "Sport Activities",
          backgroundIamge: "assets/img/sections/forest-bg.jpg",
          icon: "user-run",
          isSelected: false,
          title: "Sport"
      });
      this.preferences.push({
          id: 6,
          description: "Music Events",
          backgroundIamge: "assets/img/sections/anders-jilden.jpg",
          icon: "note-03",
          isSelected: false,
          title: "Music"
      });
      this.preferences.push({
          id: 7,
          description: "Party events",
          backgroundIamge: "assets/img/sections/daniel-olahs.jpg",
          icon: "air-baloon",
          isSelected: false,
          title: "Party"
      });
      this.preferences.push({
          id: 8,
          description: "Hang over",
          backgroundIamge: "assets/img/sections/forest-bg.jpg",
          icon: "satisfied",
          isSelected: false,
          title: "Hang Over"
      });
      this.preferences.push({
        id: 9,
        description: "Music Events",
        backgroundIamge: "assets/img/sections/anders-jilden.jpg",
        icon: "note-03",
        isSelected: false,
        title: "Music"
    });
    }
}
