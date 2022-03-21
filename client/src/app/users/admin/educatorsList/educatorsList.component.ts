import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { EducatorsListService } from "./educatorsList.service";


@Component({
    selector: 'educators-list',
    templateUrl: './educatorsList.component.html',
})
export class EducatorsListComponent implements OnInit {

    educatorsList = [];
    isLoaded = false;
    educatorsFormArr;

    constructor(private educatorsListService: EducatorsListService, private router: Router) {
        this.createFormArray();
    }

    createFormArray() {
        this.educatorsFormArr = new FormArray([]);
        this.educatorsList.forEach((val, i) => {
            this.educatorsFormArr.push(new FormControl(''));
        });

        this.educatorsFormArr.valueChanges.subscribe((data) => {
        });
    }

    ngOnInit() {
        this.getEducatorsList();
    }

    getEducatorsList() {
        this.educatorsListService.getEducatorsList()
            .then((educators: []) => {
                if (educators) {
                    this.educatorsList = educators;
                    this.isLoaded = true;
                }
            })
            .catch((err) => {
                this.isLoaded = true;
            });
    }
}