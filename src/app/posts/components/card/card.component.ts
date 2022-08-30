import { Component, Input } from '@angular/core';
import { postsNamedRoutes } from '@App/posts/posts.routes';
import { RouteFunctions } from '@App/shared/functions/route.functions';
import { ValidateFunctions } from '@App/shared/functions/validate.functions';
import { IUser } from '@App/users/models/user.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title = '';
  @Input() content = '';
  @Input() id!: number;
  @Input() user!: IUser | undefined | null;

  get postLink(): string[] {
    if (ValidateFunctions.isMissing(this.id)) {
      return [];
    }
    return RouteFunctions.getAbstractPath(
      RouteFunctions.replaceParam(
        [postsNamedRoutes.appPosts, postsNamedRoutes.posts.detail],
        ':id',
        this.id?.toString()
      )
    );
  }
}
