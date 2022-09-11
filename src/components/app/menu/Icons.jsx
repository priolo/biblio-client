import FindIcon from "/src/imeges/icons/FindIcon";
import HeartIcon from "/src/imeges/icons/HeartIcon";
import NewspaperIcon from "/src/imeges/icons/NewspaperIcon";
import UsersIcon from "/src/imeges/icons/UsersIcon";


export default function Icons({
	name,
	className,
}) {
	switch (name) {
		case "search":
			return <FindIcon className={className}/>
		case "heart":
			return <HeartIcon className={className}/>
		case "news":
			return <NewspaperIcon className={className}/>
		case "authors":
			return <UsersIcon className={className}/>
		default:
			return null
	}
}