import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSearchComponent } from './ad-search.component';

describe('AdSearchComponent', () => {
  let component: AdSearchComponent;
  let fixture: ComponentFixture<AdSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
