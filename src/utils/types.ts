import { CreationAttributes } from 'sequelize';
import { Posts } from 'src/posts/models/posts.model';
import { Users } from 'src/users/models/users.model';

export type CreateUserType = CreationAttributes<Users>;
export type CreatePostType = CreationAttributes<Posts>;
