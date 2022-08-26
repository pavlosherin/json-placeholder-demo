import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { PostsFacade } from '@App/posts/posts.facade';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersFacade } from '@App/users/users.facade';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [DetailComponent],
      providers: [PostsFacade, UsersFacade, provideMockStore({}), MatSnackBar, Overlay]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
