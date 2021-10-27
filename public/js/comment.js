const commentFormHandler = async (event) => {
  event.preventDefault();
  console.log("Comment enter")

  const comment_text = document.querySelector('#comment-text').value.trim();
  const blogid = document.querySelector('#blog-content').getAttribute('data-blogid');

console.log(blogid);
  if (comment_text) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment_text,blogid }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/blogpost/${blogid}`);
    } else {
      alert('Failed to insert comment.');
    }
  }
};


const nfp = document.querySelector('.new-comment-form');
if (nfp){
    nfp.addEventListener('submit', commentFormHandler);
}





