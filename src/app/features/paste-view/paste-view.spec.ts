import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasteView } from './paste-view';

describe('PasteView', () => {
  let component: PasteView;
  let fixture: ComponentFixture<PasteView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasteView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasteView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
