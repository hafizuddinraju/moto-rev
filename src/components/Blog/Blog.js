import React from 'react';



const Blog = () => {
	
    return (
        <div>
            <section className="bg-gray-600 text-gray-100">
	<div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
		<div rel="noopener noreferrer"  className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-900">
			<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1621503743613/eGkZpP6mP.png" alt="" className="object-cover w-full h-full rounded sm:h-96 lg:col-span-7 bg-gray-500" />
			<div className="p-6 space-y-2 lg:col-span-5">
				<h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">What are the different ways to manage a state in a React application?</h3>
				<span className="text-xs text-gray-400">October 24, 2022</span>
				<p className='text-justify'>In modern React, we build our applications with functional components. Components are themselves JavaScript functions, independent and reusable bits of code.The purpose of building the application with components is to have a modular architecture, with a clear separation of concerns. This makes code easier to understand, easier to maintain, and easier to reuse when possible.The state is an object that holds information about a certain component. Plain JavaScript functions don't have the ability to store information. The code within them executes and "dissapears" once the execution is finished.</p>
			</div>
		</div>
		<div className="grid justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<div rel="noopener noreferrer"  className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900">
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://blog.alexdevero.com/wp-content/uploads/2020/08/10-08-20-objects-prototype-and-prototypal-inheritance-in-javascript-blog.jpg" alt='' />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline"> How does prototypical inheritance work?</h3>
					<span className="text-xs text-gray-400">October 24, 2022</span>
					<p className='text-justify'>The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype. Note: The property of an object that points to its prototype is not called prototype.</p>
					
				</div>
			</div>
			<div rel="noopener noreferrer"  className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900">
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://www.guru99.com/images/1/Unit-Testing.png" alt='' />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl text-justify font-semibold group-hover:underline group-focus:underline">What is a unit test? Why should we write unit tests?</h3>
					<span className="text-xs text-gray-400">January 28, 2022</span>
					<p className='text-justify'>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
					
				</div>
			</div>
			<div rel="noopener noreferrer"  className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900">
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://www.techmagic.co/blog/content/images/2021/06/Inner-01.-React-vs-Angular-vs-Vue.js.-Introduction@2x.png" alt='' />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">React vs. Angular vs. Vue?</h3>
					<span className="text-xs text-gray-400">January 23, 2022</span>
					<p className='text-justify'>There are three frameworks for building web applications that every frontend developer has heard about: React, Vue.js, and Angular.React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework.They can be used almost interchangeably to build front-end applications, but they’re not 100 percent the same, so it makes sense to compare them and understand their differences.Each framework is component-based and allows the rapid creation of UI features.</p>
				</div>
			</div>
			
		</div>
		
	</div>
</section>
            
        </div>
    );
};

export default Blog;