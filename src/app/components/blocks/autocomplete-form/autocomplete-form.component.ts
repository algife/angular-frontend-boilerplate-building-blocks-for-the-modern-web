import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-form',
  templateUrl: './autocomplete-form.component.html',
  styleUrls: ['./autocomplete-form.component.scss'],
})
export class AutocompleteFormComponent implements OnInit {
  /* FORM 1: HireDevs */
  readonly hiredevsCtrl = new FormControl();
  readonly hiredevsCharsLimit: number = 60;
  readonly optionsDevs: string[] = ['Alexandre G.', 'Another names can be here', 'Some random person from UpWork'];
  filteredOptionsDevs: Observable<string[]> = of([]);

  /* FORM 2: Search Tech Stack */
  readonly techstackCtrl = new FormControl();
  readonly optionsTechstack: string[] = [
    'M.E.A.N Stack (MongoDB, Express.js, Angular, Node JS)',
    'M.E.R.N Stack (MongoDB, Express.js, React, Node JS)',
    'Other Tech Stack',
  ];
  filteredOptionsTechstack: Observable<string[]> = of([]);
  readonly techstackHint: string = 'Everyone includes modern JavaScript, CSS3 and HTML5.';

  ngOnInit() {
    // hiredevs
    this.filteredOptionsDevs = this.hiredevsCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDevs(value))
    );
    // techstack
    this.filteredOptionsTechstack = this.techstackCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTechs(value))
    );
  }

  // hiredevs
  private _filterDevs(value: string): string[] {
    try {
      if (value) {
        const filterValue = value.toLowerCase();
        return this.optionsDevs.filter((option) => option.toLowerCase().includes(filterValue));
      }
    } catch (err) {
      console.error(err);
    }
    return this.optionsDevs;
  }

  // techstack
  private _filterTechs(value: string): string[] {
    try {
      if (value) {
        const filterValue = value.toLowerCase();
        return this.optionsTechstack.filter((option) => option.toLowerCase().includes(filterValue));
      }
    } catch (err) {
      console.error(err);
    }
    return this.optionsTechstack;
  }
}
