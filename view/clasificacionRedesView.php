<?php 
	include_once 'public/header.php';
?>

<section id="contenido">
    <section id="principal">
        <br>
        <h2 style="text-align: center;">Determinar la clasificación de redes</h2>
        <form>
            <div class="row">
                <div class="form-group-col">
                    <p>Confiabilidad de Red</p>
                    <input type='number' id="confiabilidad" value="2" name="confiabilidad" min='2' max='7' step='1'>
                </div>

                <div class="form-group-col">
                    <p>Número de enlaces</p>
                    <input type='number' id="numero" name="numero" value="7" min='7' max='20' step='1'>
                </div>
            </div>
            <div class="row">
                <div class="form-group-col">
                    <p>Capacidad</p>
                    <select id="capacidad" name="capacidad">
                        <option value="1">Baja</option>
                        <option value="2">Media</option>
                        <option value="3">Alta</option>
                    </select>
                </div>

                <div class="form-group-col">
                    <p>Costo</p>
                    <select id="costo" name="costo">
                        <option value="1">Bajo</option>
                        <option value="2">Medio</option>
                        <option value="3">Alto</option>
                    </select>
                </div>
            </div>
        </form>
		<br>
		<br>
        <div class="buttonForms">
            <button class="button"">Determinar Redes</button>
        </div>
        <div id="resultado"></div>

    </section>
</section>

<script type="text/javascript" src="public/js/determinarRedes.js"></script>
<?php 
	include_once 'public/footer.php';
?>