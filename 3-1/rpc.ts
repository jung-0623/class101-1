export interface User {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  author: User;
  body: string;
  timestamp: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: User;
  body: string;
  timestamp: number;
}

export interface CreatePostRequest {
  body: string;
}
export interface CreatePostResponse {}

export interface CreateCommentRequest {
  postId: number;
  body: string;
}
export interface CreateCommentResponse {}

export interface ReadPostRequest {
  postId: number;
}
export interface ReadPostResponse {
  post: Post;
}

export interface ReadRandomPostRequest {}
export interface ReadRandomPostResponse {
  post: Post;
}

export interface UpdateProfileRequest {
  name: string;
}
export interface UpdateProfileResponse {}

export interface ReadProfileRequest {}
export interface ReadProfileResponse {
  user: User;
}

export interface Preview {
  id: number;
  body: string;
  timestamp: number;
}

export interface ReadPreviewRequest {}
export interface ReadPreviewResponse {
  posts: Preview[];
  comments: Preview[];
}

export interface IRpc {
  createPost: (req: CreatePostRequest) => CreatePostResponse;
  createComment: (req: CreateCommentRequest) => CreateCommentResponse;
  readPost: (req: ReadPostRequest) => ReadPostResponse;
  readRandomPost: (req: ReadRandomPostRequest) => ReadRandomPostResponse;
  readProfile: (req: ReadProfileRequest) => ReadProfileResponse;
  readPreview: (req: ReadPreviewRequest) => ReadPreviewResponse;
  updateProfile: (req: UpdateProfileRequest) => UpdateProfileResponse;
}

type AnyFunction = (...args: any) => any;
type PromiseReturn<F extends AnyFunction> = F extends (
  ...args: infer A
) => infer R
  ? (...args: A) => Promise<R>
  : never;

export type PromiseRpc = {
  [k in keyof IRpc]: PromiseReturn<IRpc[k]>;
};
