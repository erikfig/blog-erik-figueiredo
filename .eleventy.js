const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/**/*.md");
  });

  eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed.xml",
		collection: {
			name: "post",
			limit: 0,
		},
		metadata: {
			language: "pt-BR",
			title: "Blog Erik Figueiredo",
			subtitle: "Reflexões, tecnologia e opiniões por Erik Figueiredo.",
			base: "https://blog.erikfigueiredo.com.br/",
			author: {
				name: "Erik Figueiredo",
			}
		}
	});

  // Filtro para formatar datas por extenso em pt-BR
  eleventyConfig.addNunjucksFilter("dateBR", function(dateObj) {
    if (!dateObj) return '';
    if (dateObj === 'now') {
      dateObj = new Date();
    }
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  });


  eleventyConfig.addNunjucksFilter("currentYear", function(dateObj) {
    if (!dateObj) return '';
    if (dateObj === 'now') {
      dateObj = new Date();
    }
    return dateObj.getFullYear()
  });


  // Geração dinâmica do sitemap.xml
  eleventyConfig.on('afterBuild', () => {
    const siteUrl = "https://blog.erikfigueiredo.com.br";
    const postsDir = path.join(__dirname, "_site/posts");
    let urls = [
      {
        loc: siteUrl + "/",
        lastmod: new Date().toISOString().slice(0, 10),
        changefreq: "weekly",
        priority: "1.0"
      }
    ];
    if (fs.existsSync(postsDir)) {
      fs.readdirSync(postsDir).forEach(slug => {
        const postPath = path.join(postsDir, slug, "index.html");
        if (fs.existsSync(postPath)) {
          urls.push({
            loc: `${siteUrl}/posts/${slug}/`,
            lastmod: new Date().toISOString().slice(0, 10),
            changefreq: "weekly",
            priority: "1"
          });
        }
      });
    }
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}\n</urlset>\n`;
    fs.writeFileSync(path.join(__dirname, "_site/sitemap.xml"), sitemap);
  });

  // Propriedade computada: related_posts para cada post
  eleventyConfig.addGlobalData("eleventyComputed", {
    related_posts: (data) => {
      if (!data.tags || !data.collections || !data.collections.post) return [];
      const currentUrl = data.page && data.page.url;
      const posts = data.collections.post;
      const related = [];
      const seen = new Set();
      for (const post of posts) {
        if (post.url === currentUrl) continue;
        if (!post.data.tags) continue;
        if (data.tags.some(tag => post.data.tags.includes(tag))) {
          if (!seen.has(post.url)) {
            related.push(post);
            seen.add(post.url);
          }
        }
        if (related.length >= 5) break;
      }
      return related;
    }
  });

  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy("robots.txt");
};
