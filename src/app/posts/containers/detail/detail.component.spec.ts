import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { PostsFacade } from '@App/posts/posts.facade';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersFacade } from '@App/users/users.facade';
import { MatDialogModule } from '@angular/material/dialog';
import { NewspaperHeaderComponent } from '@App/posts/components/newspaper-header/newspaper-header.component';
import { ButtonLinkComponent } from '@App/posts/components/buttons/button-link.component';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '@App/posts/components/spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        DetailComponent,
        NewspaperHeaderComponent,
        ButtonLinkComponent,
        SpinnerComponent
      ],
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
