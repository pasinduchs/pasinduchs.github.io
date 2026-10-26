/*
  PROJECT LIST - add each project here after copying its two files:
  - Render image: assets/projects/images/
  - Project PDF: assets/projects/pdfs/

  Give every project unique image and PDF filenames. Spaces in filenames are
  supported, though short names with hyphens are easier to manage.
  Add each newer project as a new object at the TOP of the array below. Leave
  older entries in place so existing project cards remain unchanged and move down.
*/
(() => {
  const projects = [
    {
      title: 'DESIGN-02',
      renderImage: 'design-02-render.jpg',
      pdfDocument: 'design-02.pdf'
    },
    {
      title: 'DESIGN-01',
      renderImage: 'design-01-render.jpg',
      pdfDocument: 'design-01.pdf'
    }
  ];

  const grid = document.querySelector('[data-project-grid]');
  if (!grid) return;

  const imageFolder = 'assets/projects/images/';
  const pdfFolder = 'assets/projects/pdfs/';

  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const image = document.createElement('img');
    image.className = 'project-art';
    image.src = encodeURI(imageFolder + project.renderImage);
    image.alt = `${project.title} architectural render`;
    image.loading = 'lazy';

    const details = document.createElement('div');
    details.className = 'project-copy';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const link = document.createElement('a');
    link.className = 'button button-outline project-link';
    link.href = encodeURI(pdfFolder + project.pdfDocument);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'View Project';

    details.append(title, link);
    card.append(image, details);
    grid.append(card);
  });

})();
