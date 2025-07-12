-- StackIt Q&A Platform Database Schema
-- PostgreSQL Database Creation Script

-- Create the database (run this separately as a superuser)
-- CREATE DATABASE stackit;
-- \c stackit;

-- Create custom enum types
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE vote_type AS ENUM ('upvote', 'downvote');
CREATE TYPE notification_type AS ENUM ('new_answer', 'answer_accepted', 'question_commented', 'answer_commented');
CREATE TYPE target_entity_type AS ENUM ('question', 'answer');

-- Create tables

-- 1. Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    accepted_answer_id INTEGER, -- Will be constrained later
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Answers table
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    is_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- 5. Question_tags junction table
CREATE TABLE question_tags (
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, tag_id)
);

-- 6. Votes table
CREATE TABLE votes (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    answer_id INTEGER NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
    type vote_type NOT NULL,
    PRIMARY KEY (user_id, answer_id)
);

-- 7. Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    target_id INTEGER NOT NULL,
    target_type target_entity_type NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add foreign key constraint for accepted_answer_id after answers table is created
ALTER TABLE questions 
ADD CONSTRAINT fk_questions_accepted_answer 
FOREIGN KEY (accepted_answer_id) REFERENCES answers(id) ON DELETE SET NULL;

-- Create indexes for better performance
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_answers_user_id ON answers(user_id);
CREATE INDEX idx_answers_created_at ON answers(created_at DESC);
CREATE INDEX idx_votes_answer_id ON votes(answer_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_question_tags_question_id ON question_tags(question_id);
CREATE INDEX idx_question_tags_tag_id ON question_tags(tag_id);

-- Create a trigger to ensure only one accepted answer per question
CREATE OR REPLACE FUNCTION check_accepted_answer()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_accepted = TRUE THEN
        -- Set all other answers for this question to not accepted
        UPDATE answers 
        SET is_accepted = FALSE 
        WHERE question_id = NEW.question_id AND id != NEW.id;
        
        -- Update the question's accepted_answer_id
        UPDATE questions 
        SET accepted_answer_id = NEW.id 
        WHERE id = NEW.question_id;
    END IF;
    
    -- If setting to false and this was the accepted answer, clear the question's accepted_answer_id
    IF NEW.is_accepted = FALSE AND OLD.is_accepted = TRUE THEN
        UPDATE questions 
        SET accepted_answer_id = NULL 
        WHERE id = NEW.question_id AND accepted_answer_id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_accepted_answer
    AFTER UPDATE ON answers
    FOR EACH ROW
    EXECUTE FUNCTION check_accepted_answer();

-- Insert some sample data for testing

-- Sample users
INSERT INTO users (username, email, password_hash, role) VALUES
('john_doe', 'john@example.com', '$2b$12$hashedpassword1', 'user'),
('jane_smith', 'jane@example.com', '$2b$12$hashedpassword2', 'admin'),
('dev_guru', 'guru@example.com', '$2b$12$hashedpassword3', 'user');

-- Sample tags
INSERT INTO tags (name, description) VALUES
('javascript', 'Questions about JavaScript programming language'),
('react', 'Questions about React.js framework'),
('sql', 'Questions about SQL databases and queries'),
('python', 'Questions about Python programming language'),
('postgresql', 'Questions about PostgreSQL database');

-- Sample questions
INSERT INTO questions (user_id, title, description) VALUES
(1, 'How to use React hooks?', 'I am new to React and want to understand how to use hooks effectively in my components.'),
(3, 'SQL JOIN vs UNION difference?', 'What is the difference between JOIN and UNION operations in SQL? When should I use each?'),
(1, 'PostgreSQL indexing best practices', 'What are the best practices for creating indexes in PostgreSQL for optimal performance?');

-- Sample answers
INSERT INTO answers (question_id, user_id, description) VALUES
(1, 2, 'React hooks are functions that let you use state and other React features in functional components. Start with useState and useEffect.'),
(1, 3, 'Here is a simple example: const [count, setCount] = useState(0); This creates a state variable and a setter function.'),
(2, 2, 'JOIN combines columns from two or more tables based on a related column. UNION combines the result sets of two or more SELECT statements.'),
(3, 2, 'Create indexes on columns that are frequently used in WHERE clauses, JOIN conditions, and ORDER BY clauses. Avoid over-indexing.');

-- Sample question tags
INSERT INTO question_tags (question_id, tag_id) VALUES
(1, 1), (1, 2), -- javascript, react
(2, 3),        -- sql
(3, 3), (3, 5); -- sql, postgresql

-- Sample votes
INSERT INTO votes (user_id, answer_id, type) VALUES
(1, 1, 'upvote'),
(3, 1, 'upvote'),
(1, 3, 'upvote'),
(3, 4, 'upvote');

-- Sample notifications
INSERT INTO notifications (user_id, sender_id, type, target_id, target_type) VALUES
(1, 2, 'new_answer', 1, 'question'),
(1, 3, 'new_answer', 1, 'question'),
(3, 2, 'new_answer', 2, 'question');

-- Display table information
SELECT 'Database schema created successfully!' as status;

-- Show table counts
SELECT 
    'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'questions', COUNT(*) FROM questions
UNION ALL
SELECT 'answers', COUNT(*) FROM answers  
UNION ALL
SELECT 'tags', COUNT(*) FROM tags
UNION ALL
SELECT 'question_tags', COUNT(*) FROM question_tags
UNION ALL
SELECT 'votes', COUNT(*) FROM votes
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications;