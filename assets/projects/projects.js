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
  title: 'PRJ-04 | AURA RESIDENCE',
  description: 'Complete BIM documentation package for a two-story modern residence, featuring architectural floor plans, sections, site layout, and presentation sheet sets.',
  renderImage: 'prj-04-render.jpg',
  pdfDocument: 'PRJ-4.pdf'
},
    {
      title: 'PRJ-03 | TWO-STORY DWELLING',
      description: 'Complete BIM documentation package featuring detailed architectural floor plans, sections, and permit-ready sheet presentations.',
      renderImage: 'design-01-render.jpg',
      pdfDocument: 'PRJ-3.pdf'
    },
    {
      title: 'PRJ-02 | MODERN VILLA',
      description: 'Modern architectural design package including 3D visualization, BIM modeling, and complete sheet documentation.',
      renderImage: 'design-02-render.jpg',
      pdfDocument: 'design-02.pdf'
    },
    {
      title: 'PRJ-01 | VERDANT RETREAT',
      description: 'Coordinated BIM documentation package featuring multi-level floor plans, foundation sections, site layout, and presentation sheet sets.',
      renderImage: 'design-03-render.jpg',
      pdfDocument: 'design-03.pdf'
    }

  ];

  const imageFolder = 'assets/projects/images/';
  const pdfFolder = 'assets/projects/pdfs/';

  const projectGrid = document.querySelector('[data-project-grid]');
  if (projectGrid) projects.forEach((project) => {
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

    const description = document.createElement('p');
    description.textContent = project.description;

    const link = document.createElement('a');
    link.className = 'button button-outline project-link';
    link.href = encodeURI(pdfFolder + project.pdfDocument);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'View Project';

    details.append(title, description, link);
    card.append(image, details);
    projectGrid.append(card);
  });

  const featuredGrid = document.querySelector('[data-featured-project-grid]');
  if (featuredGrid) projects.slice(0, 3).forEach((project) => {
    const card = document.createElement('a');
    card.className = 'feature-card';
    card.href = 'projects.html';

    const image = document.createElement('img');
    image.className = 'feature-project-image';
    image.src = encodeURI(imageFolder + project.renderImage);
    image.alt = `${project.title} architectural render`;
    image.loading = 'lazy';

    const details = document.createElement('div');
    details.className = 'card-copy';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const description = document.createElement('p');
    description.textContent = project.description;

    const linkLabel = document.createElement('span');
    linkLabel.className = 'card-link';
    linkLabel.textContent = 'View project';

    details.append(title, description, linkLabel);
    card.append(image, details);
    featuredGrid.append(card);
  });

})();
