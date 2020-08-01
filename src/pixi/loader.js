import app from './pixiapp';

const loader = app.loader;

const loadResourses = (callback) => {
  app.loader /*.add('sparkle', 'assets/sparkle.png')*/
    .load(callback);
};

export { loadResourses, loader as default };
