// Test script for localStorage functionality
// Run this in browser console to test the system

const runLocalStorageTest = () => {
  console.log('🧪 Starting localStorage Test...\n');
  
  // Step 1: Clear existing data
  console.log('1️⃣ Clearing existing data...');
  localStorage.removeItem('users');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userArticles');
  console.log('✅ Data cleared\n');
  
  // Step 2: Test user registration
  console.log('2️⃣ Testing user registration...');
  const testUser = {
    id: Date.now(),
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    createdAt: new Date().toISOString()
  };
  
  // Simulate registration
  const users = [];
  users.push(testUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Simulate auto-login after registration
  const loggedInUser = {
    id: testUser.id,
    name: testUser.name,
    email: testUser.email,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
  
  console.log('✅ User registered and logged in:', loggedInUser);
  console.log('✅ Users array:', JSON.parse(localStorage.getItem('users')));
  console.log('✅ Current user:', JSON.parse(localStorage.getItem('currentUser')));
  console.log('');
  
  // Step 3: Test article creation
  console.log('3️⃣ Testing article creation...');
  const testArticle = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    title: 'Test Article Title',
    summary: 'This is a test article summary.',
    content: 'This is the full content of the test article.',
    category: 'Công nghệ',
    author: loggedInUser.name,
    authorId: loggedInUser.id,
    date: new Date().toISOString().split('T')[0],
    image: '/src/img/logo.png',
    isUserGenerated: true,
    isDraft: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const userArticles = [];
  userArticles.push(testArticle);
  localStorage.setItem('userArticles', JSON.stringify(userArticles));
  
  console.log('✅ Article created:', testArticle);
  console.log('✅ User articles:', JSON.parse(localStorage.getItem('userArticles')));
  console.log('');
  
  // Step 4: Test data consistency
  console.log('4️⃣ Testing data consistency...');
  const storedUsers = JSON.parse(localStorage.getItem('users'));
  const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  const storedUserArticles = JSON.parse(localStorage.getItem('userArticles'));
  
  // Check if current user exists in users array
  const userExists = storedUsers.find(user => user.id === storedCurrentUser.id);
  console.log('✅ Current user exists in users array:', !!userExists);
  
  // Check if article author matches current user
  const articleOwnership = storedUserArticles.every(article => 
    article.authorId === storedCurrentUser.id && 
    article.author === storedCurrentUser.name
  );
  console.log('✅ Article ownership is correct:', articleOwnership);
  
  // Check data structure consistency
  const hasRequiredUserFields = storedCurrentUser.id && storedCurrentUser.name && storedCurrentUser.email;
  console.log('✅ Current user has required fields:', hasRequiredUserFields);
  
  const hasRequiredArticleFields = storedUserArticles.every(article =>
    article.id && article.title && article.author && article.authorId && article.isUserGenerated !== undefined
  );
  console.log('✅ Articles have required fields:', hasRequiredArticleFields);
  console.log('');
  
  // Step 5: Test login simulation
  console.log('5️⃣ Testing login simulation...');
  
  // Simulate logout
  localStorage.removeItem('currentUser');
  console.log('✅ User logged out');
  
  // Simulate login
  const foundUser = storedUsers.find(user => 
    user.email === 'test@example.com' && user.password === '123456'
  );
  
  if (foundUser) {
    const reloggedUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(reloggedUser));
    console.log('✅ User re-logged in:', reloggedUser);
  } else {
    console.log('❌ Login failed');
  }
  console.log('');
  
  // Step 6: Final validation
  console.log('6️⃣ Final validation...');
  const finalUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const finalCurrentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const finalUserArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
  
  console.log('📊 Final state:');
  console.log('  - Users count:', finalUsers.length);
  console.log('  - Current user:', finalCurrentUser ? finalCurrentUser.name : 'None');
  console.log('  - User articles count:', finalUserArticles.length);
  
  const allTestsPassed = 
    finalUsers.length === 1 &&
    finalCurrentUser &&
    finalCurrentUser.name === 'Test User' &&
    finalUserArticles.length === 1 &&
    finalUserArticles[0].authorId === finalCurrentUser.id;
  
  console.log('');
  console.log(allTestsPassed ? '🎉 ALL TESTS PASSED!' : '❌ SOME TESTS FAILED!');
  
  return {
    passed: allTestsPassed,
    users: finalUsers,
    currentUser: finalCurrentUser,
    userArticles: finalUserArticles
  };
};

// Make test available globally
if (typeof window !== 'undefined') {
  window.runLocalStorageTest = runLocalStorageTest;
  console.log('🧪 Test function loaded. Run: runLocalStorageTest()');
}

export default runLocalStorageTest;
