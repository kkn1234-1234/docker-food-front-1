import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import recipesData from './FoodItems'; // Ensure this exports the recipe data with procedure

const Cb = () => {
  const { id } = useParams();
  const recipe = recipesData.find((item) => item.id === parseInt(id));
  
 const [userRating, setUserRating] = useState(0);
const [allRatings, setAllRatings] = useState([]);
const [averageRating, setAverageRating] = useState(0);

const localKey = `recipe-rating-${recipe?.id}`;

const commentsKey = `recipe-comments-${recipe?.id}`;
useEffect(() => {
  const storedRatings = JSON.parse(localStorage.getItem(localKey)) || [];
  if (Array.isArray(storedRatings)) {
    setAllRatings(storedRatings);
    if (storedRatings.length) {
      const avg = storedRatings.reduce((sum, val) => sum + val, 0) / storedRatings.length;
      setAverageRating(avg.toFixed(1));
    }
  }

  const storedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
  if (Array.isArray(storedComments)) {
    setComments(storedComments);
  }
}, [localKey, commentsKey]);

const handleRatingChange = (newRating) => {
  if (userRating > 0) return; // prevent re-rating

  const updatedRatings = [...allRatings, newRating];
  localStorage.setItem(localKey, JSON.stringify(updatedRatings));
  setAllRatings(updatedRatings);
  setUserRating(newRating);

  const avg = updatedRatings.reduce((sum, val) => sum + val, 0) / updatedRatings.length;
  setAverageRating(avg.toFixed(1));
};


  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
  e.preventDefault();
  if (newComment.trim()) {
    const updatedComments = [...comments, newComment.trim()];
    setComments(updatedComments);
    localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
    setNewComment('');
  }
};


  if (!recipe) return <div style={styles.notFound}>Recipe not found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{recipe.name}</h1>
        <img src={recipe.image} alt={recipe.name} style={styles.image} />
        <p style={styles.description}><strong>Description:</strong> {recipe.description}</p>

        {recipe.videoUrl && (
          <div style={styles.videoWrapper}>
            <h2 style={styles.sectionTitle}>Watch Video:</h2>
            <div style={styles.videoContainer}>
              <iframe
                src={recipe.videoUrl}
                title={recipe.name}
                style={styles.videoContainerIframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {recipe.procedure && (
          <div style={styles.procedureSection}>
            <h2 style={styles.sectionTitle}>Preparation Steps:</h2>
            <pre style={styles.procedure}>{recipe.procedure}</pre>
          </div>
        )}

        {/* Rating Section */}
        <div style={styles.ratingSection}>
            <h2 style={styles.sectionTitle}>Rate this Recipe:</h2>
            <div style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{
                    ...styles.star,
                    color: star <= (userRating || averageRating) ? '#fbbf24' : '#d1d5db',
                    cursor: userRating > 0 ? 'default' : 'pointer',
                    }}
                    onClick={() => handleRatingChange(star)}
                >
                    ★
                </span>
                ))}
            </div>
            {averageRating > 0 && (
                <p style={styles.ratingDisplay}>
                {userRating > 0
                    ? `You rated this ${userRating} out of 5`
                    : `Average Rating: ${averageRating} from ${allRatings.length} rating(s)`}
                </p>
            )}
        </div>


        {/* Comments Section */}
        <div style={styles.commentsSection}>
          <h2 style={styles.sectionTitle}>Comments</h2>
          <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
            <textarea
              style={styles.commentInput}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit" style={styles.commentButton}>Post</button>
          </form>

          <div style={styles.commentList}>
            {comments.length === 0 ? (
              <p style={{ color: '#666' }}>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} style={styles.commentItem}>
                  {comment}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated styles with comment styles included
const styles = {
  // ... existing styles ...
  container: {
    backgroundImage: 'url("/itm/bg.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '2rem',
    backgroundColor: '#f3f4f6',
  },
  card: {
    maxWidth: '800px',
    width: '100%',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  image: {
    width: '50%',
    height: '50%',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '4rem',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  description: {
    fontSize: '1.25rem',
    color: '#111',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: '#111',
  },
  procedureSection: {
    backgroundColor: '#f9fafb',
    padding: '1rem',
    borderRadius: '8px',
  },
  procedure: {
    whiteSpace: 'pre-wrap',
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
  },
  notFound: {
    padding: '2rem',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  videoWrapper: {
    marginTop: '2rem',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    borderRadius: '20px',
  },
  videoContainerIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
    borderRadius: '20px',
  },
  commentsSection: {
    marginTop: '2rem',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  commentInput: {
    minHeight: '80px',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  commentButton: {
    alignSelf: 'flex-end',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  commentList: {
    marginTop: '1rem',
  },
  commentItem: {
    backgroundColor: '#f1f5f9',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#333',
  },
  ratingSection: {
  marginTop: '2rem',
  marginBottom: '1rem',
},
stars: {
  fontSize: '1.75rem',
  display: 'flex',
  gap: '0.3rem',
  marginBottom: '0.5rem',
},
star: {
  transition: 'color 0.2s ease-in-out',
},
ratingDisplay: {
  fontSize: '1rem',
  color: '#374151',
},

};

export default Cb;
