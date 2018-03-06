var nongyeHost = process.env.LIVE_HOST ? process.env.LIVE_HOST : '/nongye.html';
var teacherHost = process.env.TEACHER_HOST ? process.env.TEACHER_HOST : '/teacher.html';
var assetsHost = process.env.ASSETS_HOST ? process.env.ASSETS_HOST : 'https://assets.sandbox.yike.fm/';

// project-name
var projectName = process.env.PROJECT_NAME ? process.env.PROJECT_NAME : '';

module.exports = {
  NODE_ENV: '"production"',
  NONGYE_HOST: `${nongyeHost}`,
  TEACHER_HOST: `${teacherHost}`,
  ASSETS_HOST: `${assetsHost}`,
  PROJECT_NAME: `${projectName}`,
}
