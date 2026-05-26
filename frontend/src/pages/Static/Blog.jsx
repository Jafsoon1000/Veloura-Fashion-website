export default function Blog() {
  const blogs = [
    {
      title: "Top 10 Capsule Wardrobe Pieces",
      author: "Sarah Jenkins",
      date: "May 15, 2026",
      excerpt: "Discover the essential items that can form the foundation of a versatile, timeless wardrobe for any season.",
      image: "https://images.unsplash.com/photo-1550614000-4b95d415f14a?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "How to Style Monochrome Looks",
      author: "David Chen",
      date: "April 28, 2026",
      excerpt: "Mastering the art of single-color dressing without looking dull. It's all about textures and layers.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Runway Trends That Work Daily",
      author: "Elena Rodriguez",
      date: "March 10, 2026",
      excerpt: "Translating high fashion catwalk designs into wearable everyday outfits for the office and weekends.",
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "The Ultimate Guide to Vintage Denim",
      author: "Mike Thompson",
      date: "February 22, 2026",
      excerpt: "Everything you need to know about finding, fitting, and caring for vintage denim pieces.",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2>Style Journal</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          Dive into our latest articles on fashion trends, styling tips, and industry insights written by our in-house experts.
        </p>
      </div>
      <div className="grid">
        {blogs.map((blog) => (
          <article key={blog.title} className="card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <img 
              src={blog.image} 
              alt={blog.title} 
              style={{ width: "100%", height: "250px", objectFit: "cover", display: "block" }} 
            />
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: "1" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
                <span>{blog.date}</span> &bull; <span>By {blog.author}</span>
              </div>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>{blog.title}</h3>
              <p style={{ lineHeight: "1.6", color: "var(--text-secondary)", flexGrow: "1", marginBottom: "1.5rem" }}>{blog.excerpt}</p>
              <button className="btn" style={{ width: "fit-content", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>Read Article</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
