this["bmdotcom"] = this["bmdotcom"] || {};
this["bmdotcom"]["templates"] = this["bmdotcom"]["templates"] || {};
this["bmdotcom"]["templates"]["contactView"] = function (obj) {
    var __t, __p = '',
        __j = Array.prototype.join,
        print = function () {
            __p += __j.call(arguments, '');
        };
    with(obj || {}) {
        __p += '<section class="social-media-container">\n  <h2 class="section-header">Also find me on…</h2>\n  <ul class="social-media-list">\n    ';
        _.each(currentPage.socialMedia, function (value) {
            __p += '\n      <li class="social-media-list-item">\n        <a href="' + ((__t = (value.link)) == null ? '' : __t) + '" class="social-media-link" target="_blank">' + ((__t = (value.title)) == null ? '' : __t) + '</a>\n      </li>\n    ';
        });
        __p += '\n  </ul>\n</section>\n\n<section class="form-container">\n  <form action="/contact" method="post">\n    <input name="typeOfContact" type="hidden" value="Contact Form Message" />\n\n    <label for="contactName">\n      <input id="contactName" name="name" type="text" required autofocus />\n      <span class="label-text">Name</span>\n    </label>\n\n    <label for="contactEmail">\n      <input id="contactEmail" name="_replyto" type="email" required />\n      <span class="label-text">Email</span>\n    </label>\n\n    <label for="contactSubject">\n      <input id="contactSubject" name="subject" type="text" />\n      <span class="label-text">Subject</span>\n    </label>\n\n    <label for="contactMessage">\n      <textarea id="contactMessage" name="message" rows="5" required></textarea>\n      <span class="label-text">Message</span>\n    </label>\n\n    <input type="submit" value="Send" />\n  </form>\n</section>';
    }
    return __p;
};
this["bmdotcom"]["templates"]["modalView"] = function (obj) {
    var __t, __p = '',
        __j = Array.prototype.join,
        print = function () {
            __p += __j.call(arguments, '');
        };
    with(obj || {}) {
        __p += '<div class="modal-overlay ' + ((__t = (additionalClasses)) == null ? '' : __t) + '" id="' + ((__t = (modalID)) == null ? '' : __t) + '">\n  <section class="modal-container">\n    <div class="modal-content">' + ((__t = (modalContent)) == null ? '' : __t) + '</div>\n\n    ';
        if (showCloseBtn) {
            __p += '\n      <a class="modal-close" href="javascript:void(0)"><span class="visually-hidden">close modal</span></a>\n    ';
        }
        __p += '\n  </section>\n</div>';
    }
    return __p;
};
this["bmdotcom"]["templates"]["projectsView"] = function (obj) {
    var __t, __p = '',
        __j = Array.prototype.join,
        print = function () {
            __p += __j.call(arguments, '');
        };
    with(obj || {}) {
        __p += '<ul class="projects-list">\n  ';
        _.each(currentPage, function (project) {
            __p += '\n    <li class="projects-list-item">\n      <article class="project-wrapper">\n        ';
            if (project.link) {
                print('<a href="' + project.link + '" class="project-link" target="_blank">');
            }
            __p += '\n\n        <h3 class="project-title">' + ((__t = (project.title)) == null ? '' : __t) + '</h3>\n\n        <figure class="project-media">\n          <img src="/assets/images/projects/' + ((__t = (project.media)) == null ? '' : __t) + '" alt="' + ((__t = (project.title)) == null ? '' : __t) + '" />\n        </figure>\n\n        ';
            if (project.link) {
                print('</a>');
            }
            __p += '\n\n        <p class="project-description">' + ((__t = (project.description)) == null ? '' : __t) + '</p>\n\n        <dl class="project-keywords">\n          <dt>Keywords:</dt>\n\n          ';
            _.each(project.keywords, function (keyword) {
                __p += '\n            <dd>' + ((__t = (keyword)) == null ? '' : __t) + '</dd>\n          ';
            });
            __p += '\n        </dl>\n      </article>\n    </li>\n  ';
        });
        __p += '\n</ul>';
    }
    return __p;
};
this["bmdotcom"]["templates"]["resumeView"] = function (obj) {
    var __t, __p = '',
        __j = Array.prototype.join,
        print = function () {
            __p += __j.call(arguments, '');
        };
    with(obj || {}) {
        __p += '<article class="resume-container" itemscope itemtype="http://schema.org/Person">\n  <div class="resume-column-left">\n    <section class="resume-section print-download-buttons">\n      <a href="/assets/pdf/Brad_Mallow_resume.pdf" class="download-button" target="_blank" download>download</a>\n      <a href="javascript:window.print()" class="print-button">print</a>\n    </section>\n\n    <section class="resume-section meta">\n      <dl class="resume-meta-list">\n        <dt>name</dt>\n        <dd itemprop="name">' + ((__t = (currentPage.meta.name)) == null ? '' : __t) + '</dd>\n\n        <dt>phone number</dt>\n        <dd><a itemprop="telephone" href="tel://' + ((__t = (currentPage.meta.phone.countryCode)) == null ? '' : __t) + '-' + ((__t = (currentPage.meta.phone.areaCode)) == null ? '' : __t) + '-' + ((__t = (currentPage.meta.phone.number)) == null ? '' : __t) + '">+' + ((__t = (currentPage.meta.phone.countryCode)) == null ? '' : __t) + ' (' + ((__t = (currentPage.meta.phone.areaCode)) == null ? '' : __t) + ') ' + ((__t = (currentPage.meta.phone.number)) == null ? '' : __t) + '</a></dd>\n\n        <dt>email address</dt>\n        <dd><a itemprop="email" href="mailto://' + ((__t = (currentPage.meta.email)) == null ? '' : __t) + '">' + ((__t = (currentPage.meta.email)) == null ? '' : __t) + '</a></dd>\n\n        <dt>website</dt>\n        <dd><a itemprop="url" href="' + ((__t = (currentPage.meta.website)) == null ? '' : __t) + '">' + ((__t = (currentPage.meta.website)) == null ? '' : __t) + '</a></dd>\n      </dl>\n    </section>\n\n    <section class="resume-section summary">\n      <h2 class="resume-section-header">Summary</h2>\n\n      <p>' + ((__t = (currentPage.summary)) == null ? '' : __t) + '</p>\n    </section>\n\n    <section class="resume-section education">\n      <h2 class="resume-section-header">Education</h2>\n\n      <ul class="education-list">\n        ';
        _.each(currentPage.education, function (education) {
            __p += '\n          <li itemprop="alumniOf" itemscope itemtype="http://schema.org/CollegeOrUniversity" class="education-list-item">\n            <h3 itemprop="name">' + ((__t = (education.school)) == null ? '' : __t) + '</h3>\n            <span class="education-degree-year">' + ((__t = (education.degree.type)) == null ? '' : __t) + ', ' + ((__t = (education.degree.subject)) == null ? '' : __t) + ' &#8212; ' + ((__t = (education.graduationYear)) == null ? '' : __t) + '</span>\n          </li>\n        ';
        });
        __p += '\n      </ul>\n    </section>\n\n    <section class="resume-section skills">\n      <h2 class="resume-section-header">Skills</h2>\n\n      <ul class="skills-list">\n        ';
        _.each(currentPage.skills, function (skill) {
            __p += '\n          <li class="skill-list-item">' + ((__t = (skill)) == null ? '' : __t) + '</li>\n        ';
        });
        __p += '\n      </ul>\n    </section>\n\n    <section class="resume-section tools">\n      <h2 class="resume-section-header">My Tools</h2>\n\n      <ul class="tools-list">\n        ';
        _.each(currentPage.tools, function (tools) {
            __p += '\n          <li class="tools-list-item">' + ((__t = (tools)) == null ? '' : __t) + '</li>\n        ';
        });
        __p += '\n      </ul>\n    </section>\n  </div>\n\n  <div class="resume-column-right">\n    <section class="resume-section experience">\n      <h2 class="resume-section-header">Professional Experience</h2>\n\n      <ul class="experience-list">\n        ';
        _.each(currentPage.experience, function (job) {
            __p += '\n          <li itemscope itemprop="worksFor" itemtype="http://schema.org/Organization" class="experience-list-item">\n            <h3>' + ((__t = (job.title)) == null ? '' : __t) + ', <span itemprop="name">' + ((__t = (job.organization)) == null ? '' : __t) + '</span></h3>\n\n            <span class="job-location-period">\n              ';
            print((job.location ? job.location + ' &#8212; ' : '') + job.period.start + ' to ' + (job.period.end ? job.period.end : 'present'));
            __p += '\n            </span>\n\n            ';
            if (job.description) {
                __p += '\n              <p class="job-description">' + ((__t = (job.description)) == null ? '' : __t) + '</p>\n            ';
            }
            __p += '\n\n            ';
            if (job.achievements && job.achievements.length) {
                __p += '\n              <h4 class="job-achievements-title">Achievements</h4>\n\n              <ul class="job-achievements-list">\n                ';
                _.each(job.achievements, function (achievement) {
                    __p += '\n                  <li class="job-achievements-list-item">' + ((__t = (achievement)) == null ? '' : __t) + '</li>\n                ';
                });
                __p += '\n              </ul>\n            ';
            }
            __p += '\n          </li>\n        ';
        });
        __p += '\n      </ul>\n    </section>\n  </div>\n</article>';
    }
    return __p;
};
this["bmdotcom"]["templates"]["rootView"] = function (obj) {
    var __t, __p = '',
        __j = Array.prototype.join,
        print = function () {
            __p += __j.call(arguments, '');
        };
    with(obj || {}) {
        __p += '<article class="welcome-text">\n  <p>I\'m a <strong>Frontend Developer</strong> who is passionate about seamless UX, with experience spanning industries and product categories.</p>\n  <p><strong>Get in touch</strong> if you\'d like to build something together.</p>\n  <aside class="pointing-arrow" aria-hidden="true"></aside>\n</article>';
    }
    return __p;
};