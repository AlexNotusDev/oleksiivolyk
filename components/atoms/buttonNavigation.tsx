export default function ButtonNavigation({
  name,
  redirectAction,
  redirectUrl,
  activeRoute,
}) {
  function redirect() {
    redirectAction(redirectUrl);
  }

  return (
    <div
      className={`w-28 hover:bg-gray-100 hover:text-indigo-950 cursor-pointer flex  justify-center items-center ${
        activeRoute == redirectUrl && 'bg-gray-100'
      } `}
      onClick={redirect}
    >
      <span>{name}</span>
    </div>
  );
}
