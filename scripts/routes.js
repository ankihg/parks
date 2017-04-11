"use strict";

// page.base('');
page.base('/parkfinder');

page('/', indexController.index);
page('/volunteer', volunteerController.index);
page('/parks/:id', parkController.ensureParkAll, parkController.loadParkPage, comment.loadAll);
page('/about-us',parkController.about);

page();
