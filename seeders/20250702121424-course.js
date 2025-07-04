'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('course', [
      {
        teacher_id: 2,
        title: 'JavaScript Programming for Beginners',
        description: 'A comprehensive course to learn programming from scratch using JavaScript.',
        price: 199.99,
        payable_price: 199.99,
        status: 'in_progress',
        capacity: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        teacher_id: 2,
        title: 'Introduction to UI Design',
        description: 'An introduction to the principles and basics of UI/UX design.',
        price: 149.99,
        payable_price: 100,
        status: 'coming_soon',
        capacity: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        teacher_id: 2,
        title: 'Project Management with Agile Methodology',
        description: 'Learn concepts and techniques of Agile project management.',
        price: 249.99,
        payable_price: 210.88,
        status: 'draft',
        capacity: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('course', null, {});
  },
};
