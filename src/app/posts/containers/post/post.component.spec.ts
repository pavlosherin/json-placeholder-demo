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
import { MatDialogModule } from '@angular/material/dialog';
import { UsersFacade } from '@App/users/users.facade';
import { MatIconModule } from '@angular/material/icon';
import { ButtonLinkComponent } from '@App/posts/components/buttons/button-link.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostComponent,
        NewspaperHeaderComponent,
        SpinnerComponent,
        ButtonLinkComponent
      ],
      imports: [
        HttpClientModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatIconModule,
        RouterTestingModule,
        MatButtonModule
      ],
      providers: [
        PostsFacade,
        UsersFacade,
        provideMockStore({ initialState }),
        MatSnackBar,
        Overlay
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
