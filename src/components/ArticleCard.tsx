import React from "react";
import "../styles/ArticleCard.scss";

interface ArticleCardProps {
  article: {
    title: string;
    category?: string;
    author: string;
    date: string;
    image?: string;
      source?: string;
    body?: string
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const imageUrl = `https://dummy-rest-api.specbee.site${article.image}`;
  return (
    <div className="article-card">
      <img
        style={{height:'80px',width:'80px'}}
        src={imageUrl || "https://picsum.photos/536/354"}
        
      />
          <div className="article-info">
          <p>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <h3>{article.title}</h3>
        <p>{article.body}</p>
        <b>{article.author}</b>
       
      </div>
    </div>
  );
};

export default ArticleCard;
