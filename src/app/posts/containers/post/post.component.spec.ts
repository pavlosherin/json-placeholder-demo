import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostsFacade } from '../../posts.facade';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '@App/posts/posts.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewspaperHeaderComponent } from '@App/posts/components/newspaper-header/newspaper-header.component';
import { SpinnerComponent } from '@App/posts/components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Overlay } from '@angular/cdk/overlay';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent, NewspaperHeaderComponent, SpinnerComponent],
      imports: [HttpClientModule, MatProgressSpinnerModule],
      providers: [PostsFacade, provideMockStore({ initialState }), MatSnackBar, Overlay]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
