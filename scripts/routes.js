page.base('');

// page('/', parkController.index);
page('/', indexController.index);
page('/volunteer', volunteerController.index);
// page('/parks/:id', parkController.byParkName);
page('/parks/:id', parkController.ensureParkAll, parkController.loadParkPage, comment.handleButton);
// page('/about')
page('/about-us',parkController.about);

page();
