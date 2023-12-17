
//тк путь к посту выглядит следующим образом: ./post/:postID то берём postId и передаём в функцию отрисовки поста
const postLoader = ({ params }: {params:any}) => {
  
  return params.postId;
}
export {postLoader}