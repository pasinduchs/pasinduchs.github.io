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
      title: 'PROJ-03 | MULTI-LEVEL RESIDENCE',
      description: 'Full Revit 2025 BIM documentation package featuring multi-level floor plans, schematic foundation sections, site layout, and presentation sheet sets.',
      renderImage: 'design-03-render.jpg',
      pdfDocument: 'design-03.pdf'
    },
    {
      title: 'PROJ-02 | MODERN VILLA',
      description: 'Complete architectural drawing package including 3D visualization, BIM modeling, and sheet documentation.',
      renderImage: 'design-02-render.jpg',
      pdfDocument: 'design-02.pdf'
    },
    {
      title: 'PROJ-01 | RESIDENTIAL',
      description: 'Full Revit 2025 BIM model with detailed floor plans, sections, and permit sheet presentation.',
      renderImage: 'design-01-render.jpg',
      pdfDocument: 'design-01.pdf'
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
  if (featuredGrid) projects.forEach((project) => {
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
