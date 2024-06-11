import { TPost } from '../common/types/Post';
import { TRecipe } from '../common/types/Recipes';

export function isPost(data: TPost | TRecipe): data is TPost {
  return (data as TPost).title !== undefined;
}
