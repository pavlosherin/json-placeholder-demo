import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFacade } from '@App/users/users.facade';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from '@App/users/users.state';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(usersFeature)],
  providers: [UsersFacade]
})
export class UsersModule {}
