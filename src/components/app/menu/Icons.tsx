import FindIcon from "imeges/icons/FindIcon";
import HeartIcon from "imeges/icons/HeartIcon";
import NewspaperIcon from "imeges/icons/NewspaperIcon";
import UsersIcon from "imeges/icons/UsersIcon";


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