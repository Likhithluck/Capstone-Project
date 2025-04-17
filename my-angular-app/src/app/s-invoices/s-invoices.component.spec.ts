import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SInvoicesComponent } from './s-invoices.component';

describe('SInvoicesComponent', () => {
  let component: SInvoicesComponent;
  let fixture: ComponentFixture<SInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
