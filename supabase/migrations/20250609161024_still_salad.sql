/*
  # Tool Sharing Directory Database Schema

  1. New Tables
    - `tools`
      - `id` (uuid, primary key)
      - `title` (text, tool name)
      - `description` (text, detailed description)
      - `category` (text, tool category)
      - `url` (text, optional external link)
      - `image` (text, image URL)
      - `tags` (text array, searchable tags)
      - `owner` (text, owner name)
      - `location` (text, location/address)
      - `availability` (text, availability schedule)
      - `condition` (text, tool condition)
      - `price` (numeric, daily rental price)
      - `contact_email` (text, owner email)
      - `contact_phone` (text, optional phone)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `tools` table
    - Add policies for public read access
    - Add policies for authenticated users to manage their own tools

  3. Indexes
    - Add indexes for search performance on title, description, tags
    - Add indexes for filtering on category, location, condition
*/

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  url text,
  image text,
  tags text[] DEFAULT '{}',
  owner text NOT NULL,
  location text NOT NULL,
  availability text NOT NULL,
  condition text NOT NULL CHECK (condition IN ('excellent', 'good', 'fair', 'needs-repair')),
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  contact_email text NOT NULL,
  contact_phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view tools"
  ON tools
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert tools"
  ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own tools"
  ON tools
  FOR UPDATE
  TO authenticated
  USING (contact_email = auth.jwt() ->> 'email')
  WITH CHECK (contact_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete their own tools"
  ON tools
  FOR DELETE
  TO authenticated
  USING (contact_email = auth.jwt() ->> 'email');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tools_title ON tools USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_tools_description ON tools USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_tools_tags ON tools USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools (category);
CREATE INDEX IF NOT EXISTS idx_tools_location ON tools (location);
CREATE INDEX IF NOT EXISTS idx_tools_condition ON tools (condition);
CREATE INDEX IF NOT EXISTS idx_tools_price ON tools (price);
CREATE INDEX IF NOT EXISTS idx_tools_created_at ON tools (created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO tools (
  title, description, category, url, image, tags, owner, location, 
  availability, condition, price, contact_email, contact_phone
) VALUES
(
  'DeWalt 20V Max Cordless Drill',
  'Professional-grade cordless drill with two batteries and charger. Perfect for home projects and light construction work.',
  'Power Tools',
  'https://example.com/dewalt-drill',
  'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['drill', 'cordless', 'dewalt', 'power-tool'],
  'Mike Johnson',
  'Downtown Seattle, WA',
  'Weekends',
  'excellent',
  15.00,
  'mike.johnson@email.com',
  '(555) 123-4567'
),
(
  'Honda Self-Propelled Lawn Mower',
  'Reliable gas-powered mower with self-propelling feature. Cuts grass evenly and starts easily every time.',
  'Garden Tools',
  'https://example.com/honda-mower',
  'https://images.pexels.com/photos/1231230/pexels-photo-1231230.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['mower', 'lawn', 'honda', 'gas-powered'],
  'Sarah Chen',
  'Bellevue, WA',
  'Weekdays',
  'good',
  25.00,
  'sarah.chen@email.com',
  NULL
),
(
  'Pressure Washer 2300 PSI',
  'High-pressure washer perfect for cleaning driveways, decks, and exterior surfaces. Includes multiple nozzle attachments.',
  'Cleaning Tools',
  'https://example.com/pressure-washer',
  'https://images.pexels.com/photos/8960461/pexels-photo-8960461.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['pressure-washer', 'cleaning', 'exterior'],
  'David Rodriguez',
  'Capitol Hill, Seattle, WA',
  'By appointment',
  'excellent',
  30.00,
  'david.rodriguez@email.com',
  '(555) 987-6543'
),
(
  'Circular Saw 7.25 inch',
  'Professional circular saw with laser guide. Great for cutting lumber, plywood, and other materials accurately.',
  'Power Tools',
  'https://example.com/circular-saw',
  'https://images.pexels.com/photos/5974020/pexels-photo-5974020.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['saw', 'circular', 'cutting', 'woodworking'],
  'Jennifer Wu',
  'Fremont, Seattle, WA',
  'Weekends only',
  'good',
  20.00,
  'jennifer.wu@email.com',
  NULL
),
(
  'Impact Wrench Set',
  'Pneumatic impact wrench with complete socket set. Perfect for automotive work and heavy-duty fastening.',
  'Automotive Tools',
  'https://example.com/impact-wrench',
  'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['impact-wrench', 'automotive', 'sockets', 'pneumatic'],
  'Robert Kim',
  'Kirkland, WA',
  'Most days',
  'excellent',
  18.00,
  'robert.kim@email.com',
  '(555) 555-0123'
),
(
  'Wet Tile Saw',
  'Professional wet tile saw for ceramic and stone cutting. Includes diamond blade and water cooling system.',
  'Construction Tools',
  'https://example.com/tile-saw',
  'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['tile-saw', 'ceramic', 'construction', 'wet-saw'],
  'Maria Garcia',
  'Redmond, WA',
  'Weekends',
  'good',
  35.00,
  'maria.garcia@email.com',
  NULL
),
(
  'Paint Sprayer System',
  'Airless paint sprayer perfect for interior and exterior painting projects. Includes hoses and spray tips.',
  'Painting Tools',
  'https://example.com/paint-sprayer',
  'https://images.pexels.com/photos/1598300/pexels-photo-1598300.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['paint-sprayer', 'painting', 'airless', 'interior'],
  'Tom Wilson',
  'Bothell, WA',
  'Flexible',
  'fair',
  22.00,
  'tom.wilson@email.com',
  '(555) 246-8135'
),
(
  'Angle Grinder 4.5 inch',
  'Heavy-duty angle grinder for cutting and grinding metal, concrete, and masonry materials.',
  'Power Tools',
  'https://example.com/angle-grinder',
  'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['angle-grinder', 'cutting', 'grinding', 'metal'],
  'Lisa Thompson',
  'Edmonds, WA',
  'Weekdays',
  'excellent',
  12.00,
  'lisa.thompson@email.com',
  NULL
),
(
  'Router and Table Set',
  'Professional router with table setup for precision woodworking. Includes multiple bits and guides.',
  'Woodworking Tools',
  'https://example.com/router-set',
  'https://images.pexels.com/photos/5974020/pexels-photo-5974020.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['router', 'woodworking', 'table', 'precision'],
  'James Anderson',
  'Lynnwood, WA',
  'By appointment',
  'good',
  28.00,
  'james.anderson@email.com',
  '(555) 369-2580'
),
(
  'Chainsaw 16 inch Bar',
  'Gas-powered chainsaw for tree cutting and lumber work. Recently serviced with sharp chain included.',
  'Garden Tools',
  'https://example.com/chainsaw',
  'https://images.pexels.com/photos/1231230/pexels-photo-1231230.jpeg?auto=compress&cs=tinysrgb&w=400',
  ARRAY['chainsaw', 'tree-cutting', 'gas-powered', 'lumber'],
  'Kevin Brown',
  'Tacoma, WA',
  'Weekends only',
  'good',
  40.00,
  'kevin.brown@email.com',
  NULL
);