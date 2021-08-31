<template>
	<nav class="navbar navbar-expand-md wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.20s">
		<div class="container">
			<a class="navbar-brand" href="index.html"><img src="../assets/logo.png" alt="LOGO"></a>
			<span>v 0.1.0</span>
			<div class="nav-item dropdown lang-sl">
				<a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
					<img src="../assets/icons/flag-01.png" alt="icon"> EN
				</a>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="#">Link 1</a>
					<a class="dropdown-item" href="#">Link 2</a>
					<a class="dropdown-item" href="#">Link 3</a>
				</div>
			</div>
		</div>
	</nav>
</template>
<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  }
}
</script>

