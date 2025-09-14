/*
  # Create Quiz Scores Table

  1. New Tables
    - `quiz_scores`
      - `id` (uuid, primary key)
      - `user_id` (text) - Clerk user ID
      - `user_email` (text) - User's email address
      - `programming_language` (text) - The language the quiz was about
      - `score` (integer) - Number of correct answers
      - `total_questions` (integer) - Total questions in the quiz
      - `completed_at` (timestamptz) - When the quiz was completed
      - `quiz_data` (jsonb) - Full quiz data including questions and answers

  2. Security
    - Enable RLS on `quiz_scores` table
    - Add policies for authenticated users to read all scores
    - Add policies for authenticated users to insert their own scores
*/

CREATE TABLE IF NOT EXISTS quiz_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  user_email text NOT NULL,
  programming_language text NOT NULL,
  score integer NOT NULL CHECK (score >= 0),
  total_questions integer NOT NULL CHECK (total_questions > 0),
  completed_at timestamptz DEFAULT now(),
  quiz_data jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read all quiz scores (for leaderboard)
CREATE POLICY "Users can read all quiz scores"
  ON quiz_scores
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy to allow authenticated users to insert their own quiz scores
CREATE POLICY "Users can insert their own quiz scores"
  ON quiz_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS quiz_scores_user_id_idx ON quiz_scores (user_id);
CREATE INDEX IF NOT EXISTS quiz_scores_language_idx ON quiz_scores (programming_language);
CREATE INDEX IF NOT EXISTS quiz_scores_completed_at_idx ON quiz_scores (completed_at DESC);