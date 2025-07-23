export default function Profile() {
  // Placeholder user data
  const user = {
    name: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    email: 'jane.doe@email.com',
    bio: 'Full Stack Developer. Loves networking and building cool projects.',
    skills: ['React', 'TypeScript', 'Azure', 'C#'],
    interests: ['Hackathons', 'Startups', 'Mentoring'],
    location: 'Stockholm, Sweden',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff',
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-zinc-900 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <img src={user.avatar} alt="Profile avatar" className="w-20 h-20 rounded-full border-2 border-blue-400" />
        <div>
          <h1 className="text-2xl font-bold">{user.name} {user.lastName}</h1>
          <div className="text-gray-500 dark:text-gray-400">@{user.username}</div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">{user.location}</div>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-1">Bio</h2>
        <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded">{user.bio}</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-1">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {user.skills.map(skill => (
            <li key={skill} className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded text-sm">{skill}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-1">Interests</h2>
        <ul className="flex flex-wrap gap-2">
          {user.interests.map(interest => (
            <li key={interest} className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded text-sm">{interest}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-1">Email</h2>
        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">{user.email}</div>
      </div>
    </div>
  );
}
