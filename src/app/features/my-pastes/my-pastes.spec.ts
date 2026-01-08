import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPastes } from './my-pastes';

describe('MyPastes', () => {
  let component: MyPastes;
  let fixture: ComponentFixture<MyPastes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPastes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPastes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
