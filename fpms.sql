-- ========================================
-- USERS TABLE
-- ========================================
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('client', 'freelancer', 'admin') NOT NULL DEFAULT 'freelancer',
    profile_image VARCHAR(255),
    country VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_verified BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'suspended') DEFAULT 'active'
);

-- ========================================
-- FREELANCER PROFILE
-- ========================================
CREATE TABLE freelancer_profile (
    freelancer_id BIGINT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    hourly_rate DECIMAL(10,2),
    experience_level ENUM('beginner', 'intermediate', 'expert') DEFAULT 'beginner',
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    completed_jobs INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (freelancer_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ========================================
-- SKILLS TABLE
-- ========================================
CREATE TABLE skills (
    skill_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) UNIQUE NOT NULL
);

-- ========================================
-- FREELANCER SKILLS (Mapping)
-- ========================================
CREATE TABLE freelancer_skills (
    freelancer_id BIGINT,
    skill_id BIGINT,
    PRIMARY KEY (freelancer_id, skill_id),
    FOREIGN KEY (freelancer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- ========================================
-- PROJECTS / JOBS
-- ========================================
CREATE TABLE projects (
    project_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    status ENUM('open', 'in_progress', 'completed', 'cancelled') DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deadline DATETIME,
    FOREIGN KEY (client_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_projects_client ON projects(client_id);

-- ========================================
-- PROPOSALS (BIDS)
-- ========================================
CREATE TABLE proposals (
    proposal_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    freelancer_id BIGINT NOT NULL,
    cover_letter TEXT,
    proposed_budget DECIMAL(10,2),
    estimated_days INT,
    status ENUM('pending', 'accepted', 'rejected', 'withdrawn') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_proposals_project ON proposals(project_id);
CREATE INDEX idx_proposals_freelancer ON proposals(freelancer_id);

-- ========================================
-- CONTRACTS
-- ========================================
CREATE TABLE contracts (
    contract_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    freelancer_id BIGINT NOT NULL,
    client_id BIGINT NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME,
    total_amount DECIMAL(10,2),
    status ENUM('active', 'completed', 'disputed', 'cancelled') DEFAULT 'active',
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_contracts_project ON contracts(project_id);

-- ========================================
-- PAYMENTS
-- ========================================
CREATE TABLE payments (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('credit_card', 'paypal', 'wallet') DEFAULT 'paypal',
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    transaction_id VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE CASCADE
);

CREATE INDEX idx_payments_contract ON payments(contract_id);

-- ========================================
-- REVIEWS
-- ========================================
CREATE TABLE reviews (
    review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    reviewee_id BIGINT NOT NULL,
    rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewee_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ========================================
-- MESSAGES
-- ========================================
CREATE TABLE messages (
    message_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);

-- ========================================
-- NOTIFICATIONS
-- ========================================
CREATE TABLE notifications (
    notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    message VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ========================================
-- WALLET (Optional)
-- ========================================
CREATE TABLE wallet (
    wallet_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    balance DECIMAL(10,2) DEFAULT 0.00,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ========================================
-- WALLET TRANSACTIONS (Optional for transparency)
-- ========================================
CREATE TABLE wallet_transactions (
    transaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    wallet_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type ENUM('credit', 'debit') NOT NULL,
    description VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallet(wallet_id) ON DELETE CASCADE
);
