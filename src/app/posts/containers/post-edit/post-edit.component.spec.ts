import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditComponent } from './post-edit.component';
import { UsersFacade } from '@App/users/users.facade';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '@App/posts/posts.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { PostsFacade } from '@App/posts/posts.facade';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '@App/posts/components/spinner/spinner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ButtonLinkComponent } from '@App/posts/components/buttons/button-link.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostEditComponent', () => {
  let component: PostEditComponent;
  let fixture: ComponentFixture<PostEditComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostEditComponent, SpinnerComponent, ButtonLinkComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        PostsFacade,
        UsersFacade,
        provideMockStore({ initialState }),
        MatSnackBar,
        Overlay,
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: PostEditComponent
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostEditComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({});
    component.form.addControl('title', new FormControl(null, { validators: Validators.required }));
    component.form.addControl('userId', new FormControl(null, { validators: Validators.required }));
    component.form.addControl('body', new FormControl(null));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
