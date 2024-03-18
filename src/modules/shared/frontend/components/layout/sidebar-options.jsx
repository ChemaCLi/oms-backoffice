
/**
 * @param {Object} props
 * @param {Array<{ label: string, icon: React.Element, href: string, onClick: function }>} props.options
 */
export const SidebarOptions = ({ options = [] }) => {
  return (
    <div className="flex flex-col">
      {options.map((option, index) => (
        <a
          key={index}
          href={option.href}
          onClick={option.onClick}
          className="flex items-center p-4 hover:bg-gray-700"
        >
          {option.icon}
          <span className="ml-2">{option.label}</span>
        </a>
      ))}
    </div>
  );
}
