
const newBlogHandler = async (event) => {
  event.preventDefault();

  document.location.replace('/dashboard/new');
};

const blogFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/blogpost', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to insert blog.');
    }
  }
};

const updateBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const id = document.querySelector('#post-title').getAttribute('data-userid');

  if (title && content) {
    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog.');
    }
  }
};

const deleteBlogHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-title').getAttribute('data-userid');


  const response = await fetch(`/api/blogpost/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete blog.');
  }

};

const nfp = document.querySelector('.new-post-form');
if (nfp) {
  nfp.addEventListener('submit', blogFormHandler);
}

const nbh = document.querySelector('#new-post');
if (nbh) {
  nbh.addEventListener('click', newBlogHandler);

}

const eupd = document.querySelector('#edit-update');
if (eupd) {
  eupd.addEventListener('click', updateBlogHandler);
}

const edel = document.querySelector('#edit-delete');
if (edel) {
  edel.addEventListener('click', deleteBlogHandler);
}
// document
//   .querySelector('.new-post-form')
//   .addEventListener('submit', blogFormHandler);

// document
//   .querySelector('#new-post')
//   .addEventListener('click', newBlogHandler);

