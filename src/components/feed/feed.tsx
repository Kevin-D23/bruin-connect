import styles from "./feed.module.scss";

interface FeedProps {
  posts: [Post] | [];
}

interface Post {
  firstName: String;
  lastName: String;
  pronouns: String;
  major: String;
  text: String;
  createdAt: String;
  images: [String];
  likes: Number;
}

export default function Feed({ posts }: FeedProps) {
  return (
    <div>
      {posts.map((post) => {
        return <div></div>;
      })}
    </div>
  );
}
