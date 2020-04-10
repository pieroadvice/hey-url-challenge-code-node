'use strict';

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('hit_history').del()
    .then(() => {
      // Inserts seed entries
      return knex('hit_history').insert([
        { id: 1, url_id: 1, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-03' },
        { id: 2, url_id: 1, platform: 'PC', browser: 'Safari', created_at: '2020-04-03' },
        { id: 3, url_id: 3, platform: 'Apple Mac', browser: 'Safari', created_at: '2020-04-03' },
        { id: 4, url_id: 2, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-03' },
        { id: 5, url_id: 1, platform: 'PC', browser: 'Safari', created_at: '2020-04-04' },
        { id: 6, url_id: 2, platform: 'PC', browser: 'Firefox', created_at: '2020-04-04' },
        { id: 7, url_id: 1, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-04' },
        { id: 8, url_id: 2, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-04' },
        { id: 9, url_id: 2, platform: 'Apple Mac', browser: 'Firefox', created_at: '2020-04-04' },
        { id: 10, url_id: 1, platform: 'PC', browser: 'Chrome', created_at: '2020-04-05' },
        { id: 11, url_id: 3, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-05' },
        { id: 12, url_id: 1, platform: 'PC', browser: 'Chrome', created_at: '2020-04-05' },
        { id: 13, url_id: 3, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-05' },
        { id: 14, url_id: 1, platform: 'PC', browser: 'Chrome', created_at: '2020-04-06' },
        { id: 15, url_id: 3, platform: 'Apple Mac', browser: 'Safari', created_at: '2020-04-06' },
        { id: 16, url_id: 3, platform: 'PC', browser: 'Chrome', created_at: '2020-04-07' },
        { id: 17, url_id: 3, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-08' },
        { id: 18, url_id: 3, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-08' },
        { id: 19, url_id: 2, platform: 'PC', browser: 'Firefox', created_at: '2020-04-08' },
        { id: 20, url_id: 1, platform: 'Apple Mac', browser: 'Chrome', created_at: '2020-04-08' },
        { id: 21, url_id: 1, platform: 'PC', browser: 'Chrome', created_at: '2020-04-09' },
        { id: 22, url_id: 1, platform: 'PC', browser: 'Firefox', created_at: '2020-04-09' }
      ]);
    });
};
