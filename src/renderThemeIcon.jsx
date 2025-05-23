const renderThemeIcon = () => {
  if (theme === 'light') return <FiSun size={20} />;
  if (theme === 'dark') return <FiMoon size={20} />;
  return <FiEye size={20} />;
};
