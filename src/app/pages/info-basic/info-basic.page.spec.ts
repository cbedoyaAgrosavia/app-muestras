import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoBasicPage } from './info-basic.page';

describe('InfoBasicPage', () => {
  let component: InfoBasicPage;
  let fixture: ComponentFixture<InfoBasicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoBasicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
